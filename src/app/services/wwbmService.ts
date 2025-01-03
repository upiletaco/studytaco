import { WwbmGame, WwbmQuestion } from "../util/wwbm.types";
import { getSupabase } from "./supabaseClient";

const insertWwbmMatch = async (
    data: WwbmQuestion[],
    title: string,
    user_id: string | null,
    text: string,
): Promise<string | null> => {
    console.log(`Title in insertBoard: ${title}`);

    try {
        const game_id = await insertWwbmGame(title, user_id);

        if (game_id == null) {
            console.log("Saving game failed");
            return null;
        }

        insertGameText(game_id, text);

        console.log(`Game id saved at ${game_id}`);
        for (let i = 0; i < data.length; i++) {
            const question: WwbmQuestion = data[i];
            const question_id = await insertWwbmQuestion(
                game_id,
                question.question,
            );
            console.log(`Category saved at ${question_id}`);
            if (question_id == null) return null;
            for (let j = 0; j < question.content.length; j++) {
                let correct = false;
                if (question.content[j] == question.correct) {
                    correct = true;
                }
                await insertWwbmMc(question_id, question.content[j], correct);
            }
        }
        return game_id;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertWwbmGame = async (
    title: string,
    user_id: string | null,
): Promise<string | null> => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.from("millionaire_games").insert(
            { "alias": title, "user_id": user_id },
        ).select().single();
        if (error) throw error;
        return data["id"];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const insertGameText = async (game_id: string, text: string) => {
    const supabase = getSupabase();

    try {
        const {error: uploadError } = await supabase
            .storage
            .from("files")
            .upload(`${game_id}.txt`, text, {
                contentType: "text/plain",
            });

        if (!uploadError) {
            // Update game record with file name
            const { error: updateError } = await supabase
                .from("millionaire_games")
                .update({ file_id: `${game_id}.txt` })
                .eq("id", game_id);


                if (updateError) throw updateError
        }


    } catch (err) {
        console.log(err);
    }
};

const insertWwbmQuestion = async (
    gameId: string,
    question: string,
): Promise<string | null> => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase.from("millionaire_questions")
            .insert({ "game_id": gameId, "question": question }).select()
            .single();
        if (error) throw error;
        return data["id"];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const insertWwbmMc = async (
    questionId: string,
    content: string,
    correct: boolean,
): Promise<string | null> => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase.from("millionaire_mc_options")
            .insert({
                "clue": content,
                "question_id": questionId,
                "correct": correct,
            }).select().single();
        if (error) throw error;
        return data["id"];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getWwbmGames = async (id: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.from("millionaire_games").select(
            "*",
        ).eq("id", id).single();
        if (error) throw error;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getGameText = async (game_id: string) => {
    const supabase = getSupabase();
    try {
        const game = await getWwbmGames(game_id);

        if (game == null) {
            return null;
        }

        const file_id = game.file_id;

        if (file_id == null) {
            return null;
        }

        const { data, error } = await supabase
            .storage
            .from("files")
            .download(file_id);

        if(error) throw error

        if (data) {
            const text = await data.text();
            return text
        }
        

        
    } catch (err) {
        console.log(err);
    }
};
const getWwbmQuestions = async (id: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.from("millionaire_questions")
            .select().eq("game_id", id);
        console.log(`question data: ${data}`);
        if (error) throw error;

        const questions = [];
        for (let i = 0; i < data.length; i++) {
            const mcData = await supabase.from("millionaire_mc_options").select(
                "*",
            ).eq("question_id", data[i].id);
            console.log(`${mcData}`);

            questions.push({ "options": mcData.data, "question": data[i] });
        }

        return { "questions": questions };
    } catch (error) {
        console.log(error);
    }
};

const getAllWwbmGames = async () => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.from("millionaire_games").select(
            "*",
        );
        if (error) throw error;
        return data as WwbmGame[];
    } catch (error) {
        console.log(error);
    }
};

const getUserWwbmGames = async (user_id: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.from("millionaire_games").select(
            "*",
        ).eq("user_id", user_id);
        if (error) throw error;
        return data as WwbmGame[];
    } catch (error) {
        console.log(error);
    }
};

const getWwbmGame = async (id: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("millionaire_games")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const updateWwbmHighScore = async (score: number, id: string) => {
    const supabase = getSupabase();

    try {
        const existingRow = await getWwbmGame(id);
        if (!existingRow) {
            console.log("No row found with id:", id);
            return false;
        }

        console.log("Attempting to update score:", {
            score,
            id,
            existingScore: existingRow.high_score,
        });
        const { data, error } = await supabase
            .from("millionaire_games")
            .update({ high_score: score })
            .eq("id", id)
            .select()
            .single();
        if (error) {
            console.log("Update error:", error);
            throw error;
        }

        console.log("Update successful:", data);
        return true;
    } catch (err) {
        console.log("Error updating score");
        console.error(err);
        return false;
    }
};

const getExperience = async (
    score: number,
    user_id: string,
): Promise<number> => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
            .from("user_accounts")
            .select("*")
            .eq("id", user_id)
            .select()
            .single();

        if (error || data == null) {
            console.log("Get xp error");
            throw error;
        }

        const xp = data.xp;

        if (xp == null) {
            return 0;
        }
        return xp;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

const addExperience = async (score: number, user_id: string) => {
    const supabase = getSupabase();
    try {
        let newXp = await getExperience(score, user_id);

        newXp += score;

        const { data, error } = await supabase
            .from("user_accounts")
            .update({ xp: newXp })
            .eq("id", user_id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export {
    addExperience,
    getAllWwbmGames,
    getExperience,
    getGameText,
    getUserWwbmGames,
    getWwbmGames,
    getWwbmQuestions,
    insertGameText,
    insertWwbmGame,
    insertWwbmMatch,
    insertWwbmMc,
    insertWwbmQuestion,
    updateWwbmHighScore,
};

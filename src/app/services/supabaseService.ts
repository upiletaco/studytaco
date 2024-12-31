import {
    BoardPreview,
    Category,
    JeopardyData,
    Question,
} from "../data/sampleBoardData";
import { SurveyAnswer } from "../util/survey.types";
import { getSupabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

const insertBoard = async (
    data: JeopardyData,
    title: string,
    score: number,
): Promise<string | null> => {
    console.log(`Title in insertBoard: ${title}`);
    try {
        const game_id = await insertGame(title, score);

        if (game_id == null) {
            console.log("Saving game failed");
            return null;
        }
        console.log(`Game id saved at ${game_id}`);
        for (let i = 0; i < data.categories.length; i++) {
            const category: Category = data.categories[i];
            const category_id = await insertCategory(
                game_id,
                category.category,
            );
            console.log(`Category saved at ${category_id}`);
            if (category_id == null) return null;
            for (let j = 0; j < category.questions.length; j++) {
                const question: Question = category.questions[j];
                await insertQuestion(category_id, question);
            }
        }
        return game_id;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertGame = async (
    alias: string,
    score: number,
): Promise<string | null> => {
    const supabase = getSupabase();
    const currentTimestamp = new Date().toISOString();
    const id = uuidv4();
    try {
        const { data, error } = await supabase
            .from("games")
            .insert({
                id: id,
                created_at: currentTimestamp,
                alias: alias,
                high_score: score,
            })
            .select()
            .single();
        if (error) throw error;
        return data["id"];
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertCategory = async (
    gameId: string,
    name: string,
): Promise<string | null> => {
    const supabase = getSupabase();
    const currentTimestamp = new Date().toISOString();
    const id = uuidv4();
    try {
        const { data, error } = await supabase
            .from("categories")
            .insert({
                id: id,
                created_at: currentTimestamp,
                game_id: gameId,
                name: name,
            })
            .select()
            .single();
        if (error) throw error;
        return data["id"];
    } catch (err) {
        console.log(err);
        return null;
    }
};

const insertQuestion = async (categoryId: string, question: Question) => {
    const supabase = getSupabase();
    const currentTimestamp = new Date().toISOString();
    const id = uuidv4();

    try {
        const { data, error } = await supabase
            .from("questions")
            .insert({
                id: id,
                created_at: currentTimestamp,
                category_id: categoryId,
                points: question.points,
                question: question.answer,
                clue: question.clue,
                updated_at: currentTimestamp,
            })
            .select()
            .single();
        if (error) throw error;
        return data["id"];
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getAllGamesLazy = async (
    page: number = 0,
    limit: number = 20,
): Promise<BoardPreview[]> => {
    const supabase = getSupabase();
    const start = page * limit;
    const end = start + limit - 1;
    try {
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .range(start, end)
            .order("created_at", { "ascending": false });

        if (error) throw error;

        return data as BoardPreview[];
    } catch (err) {
        console.error(err);
        return [];
    }
};

const getAllGames = async (): Promise<BoardPreview[]> => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .order("created_at", { "ascending": false });

        if (error) throw error;

        return data as BoardPreview[];
    } catch (err) {
        console.error(err);
        return [];
    }
};

const getAllPublicGames = async (): Promise<BoardPreview[]> => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .eq("is_public", true)
            .order("created_at", { "ascending": false });

        if (error) throw error;

        return data as BoardPreview[];
    } catch (err) {
        console.error(err);
        return [];
    }
};

const getBoardTitle = async (gameId: string): Promise<string | null> => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .select("alias")
            .eq("id", gameId)
            .single();

        if (error) throw error;

        return data.alias;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getGameRow = async (gameId: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .eq("id", gameId)
            .single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
const getBoardHighScore = async (gameId: string): Promise<number | null> => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .select("high_score")
            .eq("id", gameId)
            .single();

        if (error) throw error;

        return data.high_score;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getBoard = async (gameId: string): Promise<Category[] | null> => {
    try {
        const jeopardyData = [];

        const categories = await getCategories(gameId);

        console.log(`\n ${categories}`);

        if (categories == null) return [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const questions = await getQuestions(category.id);
            if (questions == null) return [];
            const sortedQuestions = questions.sort((a, b) => {
                const pointsA = a.points ?? 0;
                const pointsB = b.points ?? 0;
                return pointsA - pointsB;
            });

            jeopardyData.push({
                "category": category.name!,
                questions: sortedQuestions,
            });
        }

        return jeopardyData;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getCategories = async (gameId: string) => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("game_id", gameId);
        if (error) throw error;

        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const getQuestions = async (categoryId: string): Promise<Question[]> => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
            .from("questions")
            .select("question, clue, points")
            .eq("category_id", categoryId);

        if (error) throw error;

        if (data == null) return [];
        const questions: Question[] = [];
        for (let i = 0; i < data.length; i++) {
            const question = validateQuestion(data[i]);
            if (question == null) return [];
            questions.push(question);
        }

        return questions;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const validateQuestion = (data: {
    question: string | null;
    clue: string | null;
    points: number | null;
}): Question | null => {
    if (
        data["question"] == null || data["clue"] == null ||
        data["points"] == null
    ) {
        return null;
    }
    return {
        points: data["points"],
        clue: data["clue"],
        answer: data["question"],
    };
};

const saveUserEmail = async (email: string) => {
    const supabase = getSupabase();

    try {
        const { data: existingEmail } = await supabase
            .from("email_list")
            .select()
            .eq("email", email)
            .single();
        if (!existingEmail) {
            const { data, error } = await supabase
                .from("email_list")
                .insert({ email: email })
                .select()
                .single();
            if (error) throw error;
            if (data == null) throw error;
        }
    } catch (err) {
        console.log(err);
    }
};

const updateHighScore = async (score: number, id: string) => {
    const supabase = getSupabase();

    try {
        const existingRow = await getGameRow(id);
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
            .from("games")
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

const makeBoardPublic = async (id: string) => {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from("games")
            .update({ is_public: true })
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

const saveUserSurvey = async (data: SurveyAnswer[]) => {
    const supabase = getSupabase();
    const user = await supabase.auth.getUser();

    const userId = user.data.user?.id;
    const inputData = { "data": data };

    try {
        const { data, error } = await supabase
            .from("survey_data")
            .insert({
                data: JSON.stringify(inputData),
                user: userId,
            })
            .select()
            .single();

        if (error) throw error;
        if (data == null) throw error;
    } catch (err) {
        console.error(err);
    }
};

const checkUserSurvey = async () => {
    const supabase = getSupabase();
    const user = await supabase.auth.getUser();

    const userId = user.data.user?.id;

    console.log(`User id: ${userId}`)

    if (userId == null) {
        return;
    }

    try {
        const { data, error } = await supabase
            .from("survey_data")
            .select()
            .eq("user", userId);

        if (error) throw error;
        if (data && data.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

export {
    checkUserSurvey,
    getAllGames,
    getAllGamesLazy,
    getAllPublicGames,
    getBoard,
    getBoardHighScore,
    getBoardTitle,
    getGameRow,
    insertBoard as shareBoard,
    makeBoardPublic,
    saveUserEmail,
    saveUserSurvey,
    updateHighScore,
};

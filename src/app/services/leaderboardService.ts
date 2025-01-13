// // leaderboardServices.ts

// import { getSupabase } from "./supabaseClient";
// import { insertWwbmGame } from "./wwbmService";

// // Types
// interface LeaderboardEntry {
//   id: string;
//   user_id: string | null;
//   username: string;
//   score: number | null;
//   rank: number;
//   is_bot: boolean;
//   leaderboard_id: string;
  
// }

// const BOT_NAMES = [
//   'QuickPlayer', 'SpeedMaster', 'Brainiac', 'CleverBot', 
//   'WiseWizard', 'MindMaster', 'QuizChamp', 'BrainTeaser'
// ];

// export const createLeaderboardEntry = async (
//   gameId: string,
//   userId: string,
//   score: number,
//   username: string
// ): Promise<LeaderboardEntry | null> => {
//   const supabase = getSupabase();
  
//   try {
//     const { data, error } = await supabase
//       .from('leaderboard_entries')
//       .insert({
//         game_id: gameId,
//         user_id: userId,
//         score: score,
//         username: username,
//         is_bot: false
//       })
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// export const updateLeaderboardScore = async (
//   gameId: string,
//   userId: string,
//   score: number
// ): Promise<boolean> => {
//   const supabase = getSupabase();
  
//   try {
//     const { error } = await supabase
//       .from('leaderboard_entries')
//       .update({ score })
//       .match({ game_id: gameId, user_id: userId });

//     if (error) throw error;
//     return true;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// export const getLeaderboard = async (gameId: string): Promise<LeaderboardEntry[]> => {
//   const supabase = getSupabase();
  
//   try {
//     const { data, error } = await supabase
//       .from('leaderboard_entries')
//       .select('*')
//       .eq('game_id', gameId)
//       .order('score', { ascending: false })
//       .limit(10);

//     if (error) throw error;
//     return data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// export const ensureMinimumEntries = async (gameId: string): Promise<void> => {
//   const supabase = getSupabase();
  
//   try {
//     const entries = await getLeaderboard(gameId);
    
//     if (entries.length < 3) {
//       const botsNeeded = 3 - entries.length;
//       const botEntries = Array.from({ length: botsNeeded }, () => ({
//         game_id: gameId,
//         username: BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)],
//         score: Math.floor(Math.random() * 1000),
//         is_bot: true,
//         user_id: null
//       }));

//       await supabase
//         .from('leaderboard_entries')
//         .insert(botEntries);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const createLeaderboard = async (gameId: string) => {
//     const supabase = getSupabase()

//     try {
//         await supabase.from('leaderboards').insert({'game_id': gameId})
//     } catch (err) {
//         console.error(err)
//     }

    
// }

// export const subscribeToLeaderboard = (
//   gameId: string,
//   callback: (payload: any) => void
// ) => {
//   const supabase = getSupabase();
  
//   return supabase
//     .channel(`leaderboard-${gameId}`)
//     .on(
//       'postgres_changes',
//       {
//         event: '*',
//         schema: 'public',
//         table: 'leaderboard_entries',
//         filter: `game_id=eq.${gameId}`
//       },
//       callback
//     )
//     .subscribe();
// };

// // Add this to your existing insertWwbmGame function or create a new wrapper
// export const createGameWithLeaderboard = async (
//   title: string,
//   userId: string | null
// ): Promise<string | null> => {
//   const gameId = await insertWwbmGame(title, userId);
  
//   if (gameId) {
//     await ensureMinimumEntries(gameId);
//   }
  
//   return gameId;
// };
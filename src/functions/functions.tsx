import { GoalData } from "@/data/flatFakeData"
import { supabase } from "@/supabaseClient"

const updateGoalInDB = async (updatedGoal: GoalData) => {
        try {
            if(!supabase) throw new Error("Supabase cleint is not initialized.")
            const { data, error } = await supabase
                .from("goals")
                .update<GoalData>(updatedGoal)
                .eq("goalId", updatedGoal.goalId)
            if (error) throw error
            console.log("Goal Updated", data)
        } catch (error: any) {
            console.error("Error updating goal.", error.message)
        }
    }

export default updateGoalInDB
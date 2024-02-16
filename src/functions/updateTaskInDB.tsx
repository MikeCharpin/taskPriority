import { TaskData } from "@/data/flatFakeData"
import { supabase } from "@/supabaseClient"

const updateTaskInDB = async (updatedTask: TaskData) => {
        try {
            if(!supabase) throw new Error("Supabase cleint is not initialized.")
            const { data, error } = await supabase
                .from("tasks")
                .update<TaskData>(updatedTask)
                .eq("taskId", updatedTask.taskId)
            if (error) throw error
            console.log("Task Updated", data)
        } catch (error: unknown) {
            console.error("Error updating task.", error)
        }
    }

export default updateTaskInDB
import { supabase } from "@/supabaseClient"

const deleteTaskFromDB = async (taskId: string) => {
    try {
        await supabase.from('tasks').delete().eq('taskId', taskId).throwOnError()
        console.log("Task deleted from database.")
    } catch (error) {
        console.error("Error removing task from database.", error)
    }
    
}

export default deleteTaskFromDB
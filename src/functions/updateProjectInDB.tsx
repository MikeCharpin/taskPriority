import { ProjectData } from "@/data/flatFakeData";
import { supabase } from "@/supabaseClient";

const updatedProjectInDB = async (updatedProject: ProjectData) => {
    try {
            if(!supabase) throw new Error("Supabase cleint is not initialized.")
            const { data, error } = await supabase
                .from("projects")
                .update<ProjectData>(updatedProject)
                .eq("projectId", updatedProject.projectId)
            if (error) throw error
            console.log("Project Updated", data)
        } catch (error: unknown) {
            console.error("Error updating project.", error)
        }
}

export default updatedProjectInDB
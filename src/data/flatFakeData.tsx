
export interface GoalData {
    user_id: string | undefined,
    goalId: string, 
    goalDesc: string,
    goalStatus: string,
    goalScore: number,
    goalComplexity: string,
    goalExcitement: string,
    goalMotivation: string,
    goalRank: number,
    goalColor: string,
}

export interface ProjectData {
    user_id: string | undefined,
    projectId: string,
    projectDesc: string,
    projectGoal: string,
    projectMotivation: string,
    projectStatus: string,
    projectScore: number,
    projectPriorityScore: number,
    projectComplexity: string,
    projectExcitement: string,
    projectTimeframe: Date,
    projectRank: number,
}

export interface TaskData {
    user_id: string | undefined,
    taskId: string,
    taskScore: number,
    taskDuration: number,
    taskProject: string,
    taskDesc: string,
    taskComplexity: string,
    taskExcitement: string,
    taskStatus: string,
    taskRank: number,
}

export interface FlatFakeDataType {
    goalData: GoalData[]
    projectData: ProjectData[]
}



export const flatFakeData = {
    goalData: [
       {
            goalId: "1",
            goalDesc: "This is goal #1",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalMotivation: "",
            goalColor: "#3B82F6"
       },
        {
            goalId: "2",
            goalDesc: "This is goal #2",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "low",
            goalExcitement: "low",
            goalMotivation: "",
            goalColor: "#A21CAF"

        },
        {
            goalId: "3",
            goalDesc: "This is goal #3",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalMotivation: "",
            goalColor: "#991B1B"
        },
    ],
    projectData: [
        {
            projectId: "11",
            projectDesc: "This is project #1",
            projectGoal: "1",
            projectMotivation:"",
            projectStatus: "active",
            projectScore: 0,
            projectPriorityScore: 0,
            projectComplexity: "low",
            projectExcitement: "low",
            projectTimeframe: new Date("2024-01-01T05:00:00.000Z"),
            projectTasks: [
                111,
                113,
            ]
        },
        {
            projectId: "12",
            projectDesc: "This is project #2",
            projectGoal: "1",
            projectMotivation:"",
            projectStatus: "active",
            projectScore: 0,
            projectPriorityScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTimeframe: new Date("2024-01-01T05:00:00.000Z"),
            projectTasks: [

            ]
        },
            {
            projectId: "13",
            projectDesc: "This is project #3",
            projectGoal: "1",
            projectMotivation:"",
            projectStatus: "active",
            projectScore: 0,
            projectPriorityScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTimeframe: new Date("2024-01-01T05:00:00.000Z"),
            projectTasks: [

            ]
            
        },
        {
            projectId: "21",
            projectDesc: "This is project #4",
            projectGoal: "2",
            projectMotivation:"",
            projectStatus: "active",
            projectPriorityScore: 0,
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTimeframe: new Date("2024-01-01T05:00:00.000Z"),
            projectTasks: [
            ]
        },
        {
            projectId: "22",
            projectDesc: "This is project #5",
            projectGoal: "2",
            projectMotivation:"",
            projectStatus: "active",
            projectPriorityScore: 0,
            projectScore: 0,
            projectComplexity: "low",
            projectExcitement: "low",
            projectTimeframe: new Date("2024-01-01T05:00:00.000Z"),
            projectTasks: [

            ]
        },
    ],
    taskData: [
        {
            taskId: "111",
            taskScore: 0,
            taskStatus: "active",
            taskDuration: 15,
            taskComplexity: "low",
            taskExcitement: "high",
            taskProject: "11",
            taskDesc: "This is a task - 111"
        },
        {
            taskId: "113",
            taskScore: 0,
            taskStatus: "completed",
            taskDuration: 15,
            taskComplexity: "low",
            taskExcitement: "high",
            taskProject: "11",
            taskDesc: "This is a task - 113"
        },
    ]
}

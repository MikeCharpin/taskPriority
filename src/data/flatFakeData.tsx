
export type GoalData = {
    // Change to string when reverting back to using uuid.
    goalId: string, 
    goalDesc: string,
    goalStatus: string,
    goalScore: number,
    goalComplexity: string,
    goalExcitement: string,
    goalTargetDate: string,
}

export type ProjectData = {
    projectId: string,
    projectDesc: string,
    projectGoal: string,
    projectStatus: string,
    projectScore: number,
    projectComplexity: string,
    projectExcitement: string,
    projectTargetDate: string,
    projectTasks: TaskData[]
}

export type TaskData = {
    taskId: string,
    taskProject: string,
    taskDesc: string,
}

export type FlatFakeDataType = {
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
            goalTargetDate: "2024-02-17",
       },
        {
            goalId: "2",
            goalDesc: "This is goal #2",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalTargetDate: "2024-02-17",
        },
        {
            goalId: "3",
            goalDesc: "This is goal #3",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalTargetDate: "2024-02-17",
        },
    ],
    projectData: [
        {
            projectId: "11",
            projectDesc: "This is project #1",
            projectGoal: "1",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [
                {
                    taskId: "111",
                    taskProject: "11",
                    taskDesc: "This is a task - 111"
                },
                {
                    taskId: "112",
                    taskProject: "11",
                    taskDesc: "This is a task - 112"
                },
                {
                    taskId: "113",
                    taskProject: "11",
                    taskDesc: "This is a task - 111"
                },
                {
                    taskId: "114",
                    taskProject: "11",
                    taskDesc: "This is a task - 112"
                },
            ]
        },
        {
            projectId: "12",
            projectDesc: "This is project #2",
            projectGoal: "1",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [

            ]
        },
            {
            projectId: "13",
            projectDesc: "This is project #3",
            projectGoal: "1",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [

            ]
            
        },
        {
            projectId: "21",
            projectDesc: "This is project #4",
            projectGoal: "2",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [
                {
                    taskId: "211",
                    taskProject: "21",
                    taskDesc: "This is a task - 211"
                },
            ]
        },
        {
            projectId: "22",
            projectDesc: "This is project #5",
            projectGoal: "2",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [

            ]
        },
        {
            projectId: "31",
            projectDesc: "This is project #6",
            projectGoal: "3",
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
            projectTasks: [
                {
                    taskId: "311",
                    taskProject: "31",
                    taskDesc: "This is a task - 311"
                },
                {
                    taskId: "312",
                    taskProject: "31",
                    taskDesc: "This is a task - 312"
                },
                {
                    taskId: "313",
                    taskProject: "31",
                    taskDesc: "This is a task - 313"
                },
                {
                    taskId: "314",
                    taskProject: "31",
                    taskDesc: "This is a task - 314"
                }
            ]
        },
    ]
}

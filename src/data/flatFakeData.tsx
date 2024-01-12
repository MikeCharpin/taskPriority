
export type GoalData = {
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
    projectStatus: string,
    projectScore: number,
    projectComplexity: string,
    projectExcitement: string,
    projectTargetDate: string,
}

export type TaskData = {
    taskId: string,
    taskDesc: string,
}

export type flatFakeData = {
    goalData: GoalData[]
    projectData: ProjectData[]
    taskData: TaskData[]
}

export const flatFakeData = {
    goalData: [
       {
            goalId: 1,
            goalDesc: "This is goal #1",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalTargetDate: "2024-02-17",
       },
        {
            goalId: 2,
            goalDesc: "This is goal #2",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalTargetDate: "2024-02-17",
        },
        {
            goalId: 4,
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
            projectId: 11,
            projectDesc: "This is project #1",
            projectGoal: 1,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
        {
            projectId: 12,
            projectDesc: "This is project #2",
            projectGoal: 1,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
            {
            projectId: 13,
            projectDesc: "This is project #3",
            projectGoal: 1,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
        {
            projectId: 21,
            projectDesc: "This is project #4",
            projectGoal: 2,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
        {
            projectId: 22,
            projectDesc: "This is project #5",
            projectGoal: 2,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
        {
            projectId: 31,
            projectDesc: "This is project #6",
            projectGoal: 3,
            projectStatus: "active",
            projectScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTargetDate: "2024-02-10",
        },
    ],
    taskData: [
        {
            taskId: 111,
            taskProject: 11,
            taskDesc: "This is a task"
        },
        {
            taskId: 112,
            taskProject: 11,
            taskDesc: "This is a task"
        },
        {
            taskId: 211,
            taskProject: 21,
            taskDesc: "This is a task"
        },
        {
            taskId: 311,
            taskProject: 31,
            taskDesc: "This is a task"
        }
    ]
}

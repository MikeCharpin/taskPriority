
export interface GoalData {
    goalId: string, 
    goalDesc: string,
    goalStatus: string,
    goalScore: number,
    goalComplexity: string,
    goalExcitement: string,
    goalMotivation: string,
}

export interface ProjectData {
    projectId: string,
    projectDesc: string,
    projectGoal: string,
    projectMotivation: string,
    projectStatus: string,
    projectScore: number,
    projectPriorityScore: number,
    projectComplexity: string,
    projectExcitement: string,
    projectTimeframe: TimeframeType,
    projectTasks: TaskData[],
}

export interface TaskData {
    taskId: string,
    taskScore: number,
    taskDuration: number,
    taskProject: string,
    taskDesc: string,
    taskComplexity: string,
    taskExcitement: string,
    taskStatus: string,
}

export interface FlatFakeDataType {
    goalData: GoalData[]
    projectData: ProjectData[]
}

export interface TimeframeType {
    from: Date,
    to: Date,
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
       },
        {
            goalId: "2",
            goalDesc: "This is goal #2",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "low",
            goalExcitement: "low",
            goalMotivation: "",

        },
        {
            goalId: "3",
            goalDesc: "This is goal #3",
            goalStatus: "active",
            goalScore: 0,
            goalComplexity: "high",
            goalExcitement: "high",
            goalMotivation: "",
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
            projectTimeframe: {
                from: new Date("2022-01-01T05:00:00.000Z"),
                to: new Date("2022-01-31T05:00:00.000Z")
            },
            projectTasks: [
                {
                    taskId: "111",
                    taskScore: 0,
                    taskStatus: "active",
                    taskDuration: 20,
                    taskComplexity: "low",
                    taskExcitement: "high",
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
            projectMotivation:"",
            projectStatus: "active",
            projectScore: 0,
            projectPriorityScore: 0,
            projectComplexity: "high",
            projectExcitement: "high",
            projectTimeframe: {
                from: new Date("2022-01-01T05:00:00.000Z"),
                to: new Date("2022-01-31T05:00:00.000Z")
            },
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
            projectTimeframe: {
                from: new Date("2022-01-01T05:00:00.000Z"),
                to: new Date("2022-01-31T05:00:00.000Z")
            },
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
            projectTimeframe: {
                from: new Date("2022-01-01T05:00:00.000Z"),
                to: new Date("2022-01-31T05:00:00.000Z")
            },
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
            projectMotivation:"",
            projectStatus: "active",
            projectPriorityScore: 0,
            projectScore: 0,
            projectComplexity: "low",
            projectExcitement: "low",
             projectTimeframe: {
                from: new Date("2022-01-01T05:00:00.000Z"),
                to: new Date("2022-01-31T05:00:00.000Z")
            },
            projectTasks: [

            ]
        },
    ]
}

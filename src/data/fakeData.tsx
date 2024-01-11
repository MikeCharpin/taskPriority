import { v4 as uuidv4 } from 'uuid'

export type GoalData = {
    goalId: string,
    goalDesc: string,
    goalStatus: string,
    goalScore: number,
    goalComplexity: string,
    goalExcitement: string,
    goalTargetDate: string,
    goalProjects: ProjectData[],  
}

export type ProjectData = {
    projectId: string,
    projectDesc: string,
    projectStatus: string,
    projectScore: number,
    projectComplexity: string,
    projectExcitement: string,
    projectTargetDate: string,
    projectTasks: TaskData[]
}

export type TaskData = {
    taskId: string,
    taskDesc: string,
}

export const fakeData: GoalData[] = [
    {
        goalId: uuidv4(),
        goalDesc: "This is goal #1",
        goalStatus: "active",
        goalScore: 0,
        goalComplexity: "high",
        goalExcitement: "high",
        goalTargetDate: "2024-02-17",
        goalProjects: [
            {
                projectId: uuidv4(),
                projectDesc: "This is project #1",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    }
                ]
            },
            {
                projectId: uuidv4(),
                projectDesc: "This is project #2",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    },
                    {
                        taskId: uuidv4(),
                        taskDesc: "This is a task"
                    }
                ]
            },
        ]
    },
    {
        goalId: uuidv4(),
        goalDesc: "This is goal #2",
        goalStatus: "active",
        goalScore: 0,
        goalComplexity: "high",
        goalExcitement: "high",
        goalTargetDate: "2024-02-17",
        goalProjects: [
            {
                projectId: uuidv4(),
                projectDesc: "This is project #3",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [

                ]
            },
            {
                projectId: uuidv4(),
                projectDesc: "This is project #4",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [

                ]
            },
        ]
    },
    {
        goalId: uuidv4(),
        goalDesc: "This is goal #3",
        goalStatus: "active",
        goalScore: 0,
        goalComplexity: "high",
        goalExcitement: "high",
        goalTargetDate: "2024-02-17",
        goalProjects: [
            {
                projectId: uuidv4(),
                projectDesc: "This is project #3",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [

                ]
            },
            {
                projectId: uuidv4(),
                projectDesc: "This is project #4",
                projectStatus: "active",
                projectScore: 0,
                projectComplexity: "high",
                projectExcitement: "high",
                projectTargetDate: "2024-02-10",
                projectTasks: [

                ]
            },
        ]
    }
]
import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../components/EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

import {TaskStatuses, TaskType} from "../../api/todolist-api";
import { useActions } from '../../app/store';
import {tasksActions, todolistsActions } from '.';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    // changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    // removeTask: (params: {taskId: string, todolistId: string}) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const {updateTaskTC, removeTaskTC} = useActions(tasksActions)

    const onClickHandler = useCallback(() => removeTaskTC({taskId: props.task.id, todolistId: props.todolistId}), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTaskTC({todolistId: props.todolistId, taskId: props.task.id, domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.InProgress}})
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTaskTC({taskId: props.task.id, todolistId: props.todolistId, domainModel: {title: newValue}});
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
        style={{position: 'relative'}}
    >
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton size={'small'} onClick={onClickHandler} style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
        {props.task.status}
    </div>
})

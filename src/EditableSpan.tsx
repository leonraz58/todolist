import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTask:(value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTask(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        editMode
            ? <input value={title}
                type={props.title}
                     onBlur={activateViewMode}
                     autoFocus
                     onChange={onChangeTitleHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
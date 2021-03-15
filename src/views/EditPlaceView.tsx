import React, {useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {FirebaseDatabaseMutation, FirebaseDatabaseNode} from "@react-firebase/database";
import {FirebaseDatabaseNodesState} from "@react-firebase/database/dist/components/FirebaseDatabaseNodes";
import PlaceInput from "../components/PlaceInputComponent";
import {Place, validatePlace} from "../types/Place";
import {v4 as uuidv4} from 'uuid';

type ParamsType = {
    id: string
}

function EditPlaceView() {
    let [error, setError] = useState<string | null>(null)
    let [isSaved, setIsSaved] = useState<boolean>(false)
    let {id} = useParams() as ParamsType

    if (isSaved) {
        return (
            <Redirect to="/"/>
        )
    }

    if (id === 'new') {
        return (
            <Redirect to={`/places/${uuidv4()}`}/>
        )
    }

    const path = `/places/${id}`

    let place: Place | null = null
    const onPlaceChange = (newPlace: Place) => {
        place = newPlace
    }

    const save = (runMutation: (value: any) => Promise<any>) => () => {
        if (place) {
            const err = validatePlace(place)
            if (err) {
                setError(err)
            } else {
                runMutation(place).then(() =>{
                    setIsSaved(true)
                }, (err) => {
                    setError(`Error saving: ${JSON.stringify(err)}`)
                })
            }
        } else {
            setError('No changes to save.')
        }

    }

    const remove = (runMutation: (value: any) => Promise<any>) => () => {
        runMutation(null)
            .then(() => {
                setIsSaved(true)
            }, (err) => {
                setError(`Error deleting: ${JSON.stringify(err)}`)
            })
    }

    return (
        <>
            <FirebaseDatabaseNode
                path={path}
            >
                {(d: FirebaseDatabaseNodesState) => (
                    <>
                        {d.isLoading && (
                            <>
                                <h1>Loading...</h1>
                            </>
                        )}
                        {!d.isLoading && d.value && (
                            <div>
                                <h1>Edit Place</h1>
                                <PlaceInput initialValue={d.value as unknown as Place} onChange={onPlaceChange}/>
                            </div>
                        )}
                        {!d.isLoading && !d.value && (
                            <div>
                                <h1>New Place</h1>
                                <PlaceInput initialValue={null} onChange={onPlaceChange}/>
                            </div>
                        )}
                    </>
                )}
            </FirebaseDatabaseNode>

            <FirebaseDatabaseMutation type="set" path={path}>
                {({runMutation}) => (
                    <>
                        <button onClick={save(runMutation)}>Save</button>
                        <br/>
                        <button onClick={remove(runMutation)}>Delete</button>
                    </>
                )}
            </FirebaseDatabaseMutation>

            {error && (
                <>
                    <p>{error}</p>
                </>
            )}
        </>
    );
}

export default EditPlaceView;

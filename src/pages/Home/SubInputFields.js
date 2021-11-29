import {useEffect, useRef, useState} from "react";
import {FileDrop} from 'react-file-drop';
import {useDispatch} from "react-redux";
import { addNewEntryAction } from "../../redux/slices/calculationResultsSlice";
import axios from "axios";
import {toast} from "react-hot-toast";

const SubInputFields = () => {
    const calculationTitleRef = useRef(null)
    const inputFileRef = useRef(null)
    const [dndClassName, setDndClassName] = useState('')
    const [fileContent, setFileContent] = useState('')
    const [calculationTitle, setCalculationTitle] = useState('')
    const [inputErrors, setInputErrors] = useState({})
    const [textFile, setTextFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        calculationTitleRef.current.focus()
    }, [])


    const fileInsert = file => {
        if (file?.type === "text/plain") {
            setTextFile(file)
            const reader = new FileReader()
            reader.onload = async (e) => {
                const text = e.target.result
                setFileContent(text)
            };
            reader.readAsText(file)
        }

    }

    const validate = () => {
        const errors = {};
        // validate title before submit
        if (!calculationTitle) {
            errors.title = 'Title field is required!'
        } else {
            if (calculationTitle.length > 15) {
                errors.title = 'Maximum 15 characters allow!'
            }
        }

        // validate file content before submit
        if (!fileContent) {
            errors.file = 'Text file is required!'
        }

        if(Object.keys(errors).length){
            return errors
        }else {
            return false
        }
    }

    const submit = () => {
        if(loading === false){
            setLoading(true)
            const errors = validate();
            if(errors){
                setLoading(false)
                return setInputErrors(errors)
            }else{
                setInputErrors({})
                const form = new FormData();
                form.append('title', calculationTitle)
                form.append('textFile', textFile)
                axios.post('/calculate', form)
                    .then(res => {
                        dispatch(addNewEntryAction(res.data.data))
                        setLoading(false)

                    })
                    .catch(err => {
                        setInputErrors({
                            file: err?.response?.data?.errors?.textFile || '',
                            title: err?.response?.data?.errors?.title || ''
                        })
                        setLoading(false)
                        toast.error(err?.response?.data?.message || 'Something went wrong!')
                    })
            }
        }



    }

    return (
        <>
            <hr/>
            <h2 className="px-2  py-2 text-xl font-bold text-gray-700 tracking-wider">Input</h2>
            <div className="py-2 px-2">
                <div className="flex items-start">
                    <input value={calculationTitle} onChange={e => setCalculationTitle(e.target.value)} type="text"
                           ref={calculationTitleRef}
                           className={`focus:ring-blue-600 focus:ring-2 focus:outline-none w-10/12 py-2 px-2 text-gray-500 border rounded ${inputErrors?.title && 'border-red-600'}`}
                           placeholder={'Calculation title'}/>
                    <span className="text-red-500 text-2xl ml-1">*</span>
                </div>
                <div className="text-xs text-red-600">{inputErrors?.title}</div>
            </div>

            <div className="py-2 px-2">
                <div className="flex items-start">
                    <div onClick={() => inputFileRef.current.click()}
                         className={`w-10/12 h-24 cursor-pointer overflow-hidden relative border-2 rounded transition-all duration-300 py-3 ${dndClassName} ${inputErrors?.file && 'border-red-600'}`}>
                        <FileDrop
                            onDragOver={(event) => setDndClassName('bg-gray-300')}
                            onDragLeave={(event) => setDndClassName('')}
                            onDrop={(files, event) => {
                                setDndClassName('bg-gray-200')
                                fileInsert(files[0])
                                console.log('onDrop!', files[0], event)
                            }}
                        >
                            <img src="/images/download.jpeg" alt=""
                                 className="h-12 w-full object-center object-contain"/>
                            <p className="text-center font-bold  text-sm text-gray-600">Drop your txt file with math
                                here!</p>
                            <input ref={inputFileRef} onChange={(e) => fileInsert(e.target.files[0])} type="file"
                                   accept={'.txt'} className={'cursor-pointer h-full w-full opacity-0 left-0 top-0'}/>
                            {
                                fileContent && (
                                    <div
                                        className="absolute overflow-y-scroll overflow-x-hidden h-full bg-gray-800 text-gray-300 px-2 py-2 text-xs font-light top-0 left-0 w-full">
                                        {
                                            fileContent.split("\n").map((text, index) => {
                                                return (
                                                    <div key={index} className="flex gap-1">
                                                        <span className={'w-3'}>{index + 1 + ': '}</span>
                                                        <pre className={'flex-1 text-white'}>{text}</pre>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }

                        </FileDrop>
                    </div>

                    <span className="text-red-500 text-2xl ml-1">*</span>
                </div>
                <div className="text-xs text-red-600">{inputErrors?.file}</div>


            </div>

            <div className="py-2 px-2">
                <button onClick={submit}
                        className="bg-gray-400 transition-all duration-300 hover:bg-gray-300 text-black py-2 px-4 rounded-full border-2">
                    {
                        loading ? 'Calculating! Please wait...' : 'Calculate'
                    }
                </button>
            </div>
        </>
    )
}

export default SubInputFields
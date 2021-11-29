import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useSelector, useDispatch} from "react-redux";
import {resultSelector, reOrderResultsAction} from "../../redux/slices/calculationResultsSlice";
import DNDItem from "../../components/listItem/DNDItem";
import axios from 'axios';


const SubDNDList = () => {
    const {result} = useSelector(resultSelector)

    const dispatch = useDispatch();

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const onDragEnd = (re) => {
        // dropped outside the list
        if (!re.destination) {
            return;
        }


        const items = reorder(
            result,
            re.source.index,
            re.destination.index
        );

        axios.post('/reorder', {ids: items.map(i => i._id)})
            .then(res => console.log('ok'))
            .catch(err => console.log('not ok'))

        dispatch(reOrderResultsAction(items))
    }

    return (
        <>
            <h2 className="text-lg font-bold px-2">Total Item : {result.length}</h2>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {result.map((item, index) => (
                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            className={'py-2 my-2 mx-2'}
                                        >
                                            <DNDItem item={item}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default SubDNDList
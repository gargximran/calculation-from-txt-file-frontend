import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect} from "react";
import DNDItem from "../../components/listItem/DNDItem";
import axios from 'axios'

const History = () => {


    const [results, setResults] = useState([])
    const [skip, setSkip] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    window.socket.on('newCalculationDone', (res) => {
        setTotalCount(totalCount + 1)
        setResults([res, ...results])
    })

    const getData = () => {
            axios.post('/history', {}, {params: {skip: skip}})
                .then(newResult => {
                    if(newResult?.data?.result.length){
                        setTotalCount(newResult.data.count)
                        setResults([...results, ...newResult.data.result])
                        setSkip(skip+10)
                    }

                })
                .catch(err => false)


    }

    useEffect(() => {
        axios.post('/history', {}, {params: {skip: skip}})
            .then(newResult => {
                setTotalCount(newResult.data.count)
                setResults([...results, ...newResult.data.result])
                setSkip(skip+10)
            })
            .catch(() => false)
// eslint-disable-next-line
    }, [])



    return (
        <div style={{minHeight: '35rem'}}>
            <h2 className="text-lg font-bold px-2">Total Item : {results.length}</h2>
            <InfiniteScroll
                dataLength={results.length}
                next={getData}
                hasMore={results.length !== totalCount}
                loader={<div className="loader text-center" key={0}>Loading ...</div>}
            >
                {
                    results.map(result => {
                        return (
                            <div key={result._id} className="py-2 m-2 border-2 rounded">
                                <DNDItem item={result} />
                            </div>
                        )
                    })
                }

            </InfiniteScroll>
        </div>
    )
}

export default History
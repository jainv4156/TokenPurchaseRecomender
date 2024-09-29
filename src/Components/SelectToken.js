import axios from 'axios';
import React,{useState,useEffect} from 'react'
import GeneratedAnd from './GeneratedAnd';
import './SelectToken.css'

export default function SelectToken() {

    const [tokensList, setTokenList] = useState([])
    const [selectedToken, setSelectedToken] = useState("")

// console.log(selectedToken )

    useEffect(() => {
        const query = `
    {
        tokens(first:300 orderBy: volumeUSD, orderDirection: desc) {
            id
            name
            symbol
            feesUSD
            derivedETH
            txCount
        }
    }
    `;
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
        axios.post(url, { query })
            .then((result) => {
                // console.log(result.data.data.tokens)
                setTokenList(result.data.data.tokens);
                // ReconmendTokenPriceByAi(result.data.data.tokenDayDatas);

            })
            .catch((error) => {
                console.error(error);
            });
    }
        , [])
        const handleSelectedToken = (event) => {
            const value = event.target.value;
            console.log(value)
            setSelectedToken(event.target.value);

          };
        

    return (<>
        <div className='SelectToken'>
            <h1>Select Token</h1>
            <select onClick={handleSelectedToken}>
            <option value="">-- Please select an option --</option>

                {tokensList.map((token) => {
                    return <option key={token.id} value={token.id} >{token.symbol}</option>
                })}
            </select>
            
        
        <GeneratedAnd selectedToken={selectedToken} />
        </div>


    </>

    )
}

import React, { useState } from 'react'
import axios from 'axios';
import './GeneratedAnd.css'

export default function GeneratedAnd(props) {

    const [generatedAns,setGeneratedAns] = useState("")


     function ReconmendTokenPriceByAi(ReferenceJsonData) {
        const ReferenceData = ReferenceJsonData.map(
            data => `On ${data.date} the price of ${data.token.symbol} was ${data.priceUSD} and the total value locked was ${data.totalValueLockedUSD} and the volume was ${data.volumeUSD} and the high was ${data.high} and the low was ${data.low}`
        ).join('\n');
        const promt = `here's the data from uniswap api :${ReferenceData}... please can you tell me SHould I buy or sell the token i am lokking for stablility kepp your anwer consise and dont ask questions?`;
        const url = `https://llama.us.gaianet.network/v1/chat/completions`;

        axios.post(url, {
            model: 'llama',
            messages: [{ role: 'system', content: "Yout are helpful assistent that analyse Uniswap data and give predect the future price" }, { role: 'user', content: promt }]
        })
            .then((result) => {
                setGeneratedAns(result.data.choices[0].message.content);
                console.log(result.data.choices[0].message.content);

            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleGenerateAns = () => {
        if(props.selectedToken === ""){
            alert("Please select a token first")
            return
        }
        setGeneratedAns("Loading....")
        const query = `
        {   
        tokenDayDatas(first: 100, where: {token_: {id: "${props.selectedToken}"}}) {
        date
        id
        priceUSD
        totalValueLockedUSD
        volumeUSD
        high
        low
        token {
          symbol
          id
        }
      }
        }
        `;
        const apiKey = process.env.REACT_APP_API_KEY;

        const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
        console.log(url);

        axios.post(url, { query })
            .then((result) => {
                // console.log(result.data.data.tokenDayDatas)
                ReconmendTokenPriceByAi(result.data.data.tokenDayDatas);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(props.selectedToken)
    }


    return (<>
        <button onClick={handleGenerateAns}>GenerateAns</button>

        <div className='codeContainer'>
            {generatedAns}

        </div>
    </>

    )
}

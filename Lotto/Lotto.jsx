import React, { useState, useRef, useEffect, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getNumbers');
    const candidate = Array(45).fill().map( (v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0,6).sort( (p,c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo( ()=> getWinNumbers(), []); //useMemo: 복잡한 함수 결과 값을 기억 useRef: 일반 값을 기억
    const [winNumbers, setWInNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect( () => {
        for(let i=0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout( () => {
                setWinBalls( (prevBalls) => [...prevBalls, winNumbers[i]]);
              }, (i + 1) * 1000);
          }
          timeouts.current[6] = setTimeout( () => {
              setBonus(winNumbers[6]);
              setRedo(true);
          }, 7000);
          return () => {
              timeouts.current.forEach( (v) => {
                  clearTimeout(v);
              })
          }
    }, [timeouts.current]); //빈 배열이면 componentDidMount와 동일

    const onClickRedo = () => {
        setWInNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }; 

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={redo ? onClickRedo : () => {}}>한번 더!</button>}
        </>  
    );
}

export default Lotto;
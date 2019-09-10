import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    };
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state } = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이되면 클릭하세요',
            });
            this.timeout = setTimeout( () => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000 ) + 2000); //2초 ~ 3초
        } else if( state === 'ready' ){ //성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });
        } else if( state === 'now' ){
            this.endTime = new Date();
            this.setState((prevState)=>{
                return{
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        })
    }
    renderAverage = () => {
        return this.state.result.length === 0
        ? null
        : <><div>평균시간 : {this.state.result.reduce((a, c) => a + c ) / this.state.result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;
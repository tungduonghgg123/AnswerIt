class AnswerIt {
    threads = [];
    setThread(questionHash, duration, money) {
        //check
        let thread = {
            id: questionHash, 
            duration, 
            money,
            answer2owner: new Map()
        }
        this.threads.push(thread);
        this.thread2owner.set( thread.id  , 'msg.sender')
    }
    answer( threadId, answerHash ) {
        //check
        // add timestamp
        if(!threadId || !answerHash)    
            return;
        let thread = this.threads.find(_thread => _thread.id === threadId);
        if(thread)
            thread.answer2owner.set(answerHash, 'msg.sender')
    }
    sendReward(threadId, answerHash) {
        // check thread owner
        // send reward to the questionHash's owner
    }
    withdraw(threadId) {
        // withdraw all money
    }

}

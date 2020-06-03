
import React from 'react';
import Button from '@material-ui/core/Button';
import { timestamp2date} from '../web3/common'
function QuestionFeed(props) {
    const {reward, expireTime, value} = props
  return (
    <div style={{
        background: 'red'
    }}>
        
        {reward? <span>{reward} ICE </span> : null }
        <span>{timestamp2date(expireTime)}</span>
        <br/>
        <span>{value}</span>
    </div>
  );
}
export {QuestionFeed}
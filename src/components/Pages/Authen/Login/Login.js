import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LayoutAuthen, BoxAuthen, ShadowBoxAuthen } from '../../../Elements/StyledUtils';
// import { HeaderAuthen } from '../../../Elements/Common';
import ByMnemonic from './ByMnemonic';
import ByPassWord from './ByPassWord';
import { MyLink} from '../../../Elements/Button';

import * as actionCreate from '../../../../redux/actions/create';
// import ScanQRCodeModal from '../../../elements/ScanQRCodeModal';

const styles = () => ({
  //   button: {
  //     margin: theme.spacing(1),
  //     background: 'linear-gradient(332deg, #b276ff, #fe8dc3)',
  //   },
});

function Login(props) {
  const { history, setStep, step } = props;
  const [recoveryPhase, setRecoveryPhase] = useState('');

  function gotoRegister() {
    setStep('one');
    history.push('/register');
  }

  return (
    <div>
      <QueueAnim delay={200} type={['top', 'bottom']}>
        <LayoutAuthen key={1}>
          <BoxAuthen>
            <ShadowBoxAuthen>
              {/* <HeaderAuthen title={<FormattedMessage id="login.login" />} /> */}

              {step === 'one' && <ByPassWord />}
              {step === 'two' && (
                <ByMnemonic
                  recoveryPhase={recoveryPhase}
                  setRecoveryPhase={setRecoveryPhase}
                />
              )}
              <div className="btRegister">
                <span>
                  <FormattedMessage id="login.noAcc" />
                </span>
                <MyLink onClick={gotoRegister}>
                  <FormattedMessage id="login.btnRegist" />
                </MyLink>
              </div>
            </ShadowBoxAuthen>
          </BoxAuthen>
        </LayoutAuthen>
      </QueueAnim>
    </div>
  );
}

const mapStateToProps = state => {
  const e = state.create;
  return {
    step: e.step,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStep: value => {
      dispatch(actionCreate.setStep(value));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));

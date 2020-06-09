import React, { useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import styled from 'styled-components';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import WarningIcon from '@material-ui/icons/Warning';
import { useSnackbar } from 'notistack';


import { isAliasRegistered, setTagsInfo, registerAlias } from '../../../../helper/account'
import { wallet } from '../../../../helper/utils'
import {getWeb3} from '../../../../web3'
import { DivControlBtnKeystore, FlexBox } from '../../../Elements/StyledUtils';
import { ButtonPro, LinkPro } from '../../../Elements/Button';
// import { useRemember } from '../../../../helper/hooks';

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  avatarBox: {
    marginTop: theme.spacing(1),
    '@media (max-width: 768px)': {
      marginTop: theme.spacing(3),
    },
  },
  avatar: {
    width: 100,
    height: 100,
  },
}));

function Register2(props) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  // const { enqueueSnackbar } = useSnackbar();

  //   const [isRememberState, setIsRememberState] = useRemember();
  const classes = useStyles();
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      if (value !== password) {
        return false;
      }
      return true;
    });

    // Fix issue #148
    ValidatorForm.addValidationRule('specialCharacter', async name => {
      // const regex = new RegExp('^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$');
      const regex = new RegExp('^(?![_.])(?!.*[_.]{2})[a-z0-9._]+[a-z0-9]$');
      return regex.test(name);
    });

    ValidatorForm.addValidationRule('isAliasRegistered', async name => {
      const resp = await isAliasRegistered(name);
      return !resp;
    });

    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('isAliasRegistered');
    };
  }, [password]);
  function createAccountWithMneomnic() {
    const { mnemonic, privateKey, publicKey, address } = wallet.getAccountFromMneomnic();
    return { mnemonic, privateKey, publicKey, address };
  }
  async function gotoNext() {
    const isUsernameRegistered = await isAliasRegistered(username);
    if (isUsernameRegistered) {
      const message = 'This username is already taken.';
      // enqueueSnackbar(message, { variant: 'error' });
    } else {
      // setLoading(true);
      setTimeout(async () => {
        try {
          const account = await createAccountWithMneomnic();
          const { privateKey, address, publicKey, mnemonic } = account;
          const displayname = `${firstname} ${lastname}`;

          // setAccount({ username, address, privateKey, publicKey, cipher: password, mnemonic });
          const tweb3 = getWeb3();
          tweb3.wallet.importAccount(privateKey);
          tweb3.wallet.defaultAccount = address;

          const registerInfo = [];
          const opts = { address };
          let avatarUrl;
          registerInfo.push(
            setTagsInfo(
              {
                'display-name': displayname,
                firstname,
                lastname,
                'pub-key': publicKey,
              },
              opts
            )
          );
          registerInfo.push(registerAlias(username, address));
          await Promise.all(registerInfo);

          const newAccount = {
            address,
            privateKey,
            cipher: password,
            publicKey,
            mnemonic,
          };
          console.log(newAccount)
          props.setAccount(newAccount);


          // setLoading(false);
          props.setStep('two');
          // setIsRemember(isRememberState);

          // REMARK:
          // No matter we explicitly store or not, Chrome ALWAYS shows a popup
          // offering user to save password. It is the user who decides.
          // The following code just adds extra info (display name, avatar)
          // if user opt to save.
          // This extra data makes the 'select account' popup looks better
          // when we get password later in non-silent mode

          // save to browser password manager
          if (window.PasswordCredential) {
            const credData = { id: username, password, name: displayname };
            if (avatarUrl) {
              credData.iconURL = avatarUrl;
            }
            const cred = new window.PasswordCredential(credData);

            // If error, just warn to console because this feature is not essential
            navigator.credentials.store(cred).catch(console.warn);
          }
        } catch (error) {
          console.error(error);
          const message = `An error has occured. Detail:${error}`;
          // enqueueSnackbar(message, { variant: 'error' });
          // setLoading(false);
        }
      }, 100);
    }
  }
  return (
    <>
      <ValidatorForm
        onSubmit={gotoNext}
      >
        <TextValidator
          label={<FormattedMessage id="regist.userName" />}
          fullWidth
          onChange={event => {
            setUsername(event.currentTarget.value.toLowerCase());

          }}
          name="username"
          validators={['required', 'specialCharacter', 'isAliasRegistered']}
          errorMessages={[
            <FormattedMessage id="regist.requiredMes" />,
            <FormattedMessage id="regist.characterCheck" />,
            <FormattedMessage id="regist.userTaken" />,
          ]}
          margin="dense"
          value={username}
          inputProps={{ autoComplete: 'username' }}
        />
        <FlexBox>
          <TextValidator
            label={<FormattedMessage id="regist.firstName" />}
            fullWidth
            onChange={event => {
              setFirstname(event.currentTarget.value);
            }}
            name="firstname"
            validators={['required']}
            errorMessages={[<FormattedMessage id="regist.requiredMes" />]}
            className={classes.marginRight}
            margin="dense"
            value={firstname}
          />
          <TextValidator
            label={<FormattedMessage id="regist.lastName" />}
            fullWidth
            onChange={event => {
              setLastname(event.currentTarget.value);
            }}
            name="lastname"
            validators={['required']}
            errorMessages={[<FormattedMessage id="regist.requiredMes" />]}
            margin="dense"
            value={lastname}
          />
        </FlexBox>
        <TextValidator
          label={<FormattedMessage id="regist.password" />}
          fullWidth
          onChange={event => {
            setPassword(event.currentTarget.value);
          }}
          name="password"
          type="password"
          validators={['required']}
          errorMessages={[<FormattedMessage id="regist.requiredMes" />]}
          margin="dense"
          value={password}
          inputProps={{ autoComplete: 'new-password' }}
        />
        <TextValidator
          label={<FormattedMessage id="regist.rePassword" />}
          fullWidth
          onChange={event => {
            setRePassword(event.currentTarget.value);
          }}
          name="rePassword"
          type="password"
          validators={['isPasswordMatch', 'required']}
          errorMessages={[<FormattedMessage id="regist.passMismatch" />, <FormattedMessage id="regist.requiredMes" />]}
          margin="dense"
          value={rePassword}
          inputProps={{ autoComplete: 'new-password' }}
        />
        {/* <div>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    value={isRememberState}
                    checked={isRememberState}
                    color="primary"
                    onChange={() => setIsRememberState(!isRememberState)}
                  />
                }
                label={<FormattedMessage id="regist.rememberMe" />}
              />
            </div> */}
        <WarningPass>
          <SnackbarContent
            className="warningSnackbar"
            message={
              <span className="warningMessage">
                <WarningIcon className="warningIcon" />
                <span className="warningText">
                  <FormattedMessage id="regist.warningText" />
                </span>
              </span>
            }
          />
        </WarningPass>

        <DivControlBtnKeystore>
          <div>
            <span>
              <FormattedMessage id="regist.alreadyAcc" />
            </span>
            <LinkPro
              className="alreadyAcc"
            // onClick={gotoLogin}
            >
              <FormattedMessage id="regist.login" />
            </LinkPro>
          </div>
          <ButtonPro type="submit" className="nextBtn">
            <FormattedMessage id="regist.next" />
            {/* <Icon className={classes.rightIcon}>arrow_right_alt</Icon> */}
          </ButtonPro>
        </DivControlBtnKeystore>
      </ValidatorForm>
      {/* {isOpenCrop && <ImageCrop close={closeCrop} accept={acceptCrop} originFile={originFile} />} */}
    </>
  );
}

export default connect(null, actions)(Register2)

const WarningPass = styled.div`
  .warningSnackbar {
    background-color: #fe7;
    box-shadow: none;
    margin-top: 8px;
    max-width: 400px;
  }
  .warningMessage {
    display: flex;
    alignitems: center;
  }
  .warningIcon {
    margin-right: 16px;
    color: #d90;
  }
  .warningText {
    color: #333;
    font-style: italic;
    font-size: 1.1em;
  }
`;
import React from "react";
import CancelButton from "../cancel/CancelButton";
import SaveAndContinueButton from "../save-and-continue/SaveAndContinueButton";
import TemporarySaveButton from "../temporary-save/TemporarySaveButton";
import ButtonComplete from "../complete/ButtonComplete";
import SaveButton from "../save/SaveButton";
import FooterGroupView from "./FooterGroupView";
import PropTypes from "prop-types";

const ButtonFooterGroup = (props) => {
  const {
    onAddReceiptAndPrint,

    showButtonComplete,
    showTemporarySaveButton,
    showSaveAndContinueButton,
    onCancel,
    onSave,
    onButtonComplete,
    buttonCompleteLoading,
    onTemporarySave,
    temporarySaveLoading,
    onSaveAndContinue,
    saveLoading,
    saveAndContinueLoading,
    showSave = true,
  } = props;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleSaveAndContinue = () => {
    if (onSaveAndContinue) {
      onSaveAndContinue();
    }
  };
  const handleTemporarySaveButton = () => {
    if (onTemporarySave) {
      onTemporarySave();
    }
  };
  const handleButtonComplete = () => {
    if (onButtonComplete) {
      onButtonComplete();
    }
  };
  return (
    <FooterGroupView>
      <CancelButton
        onClick={handleCancel}
        style={{
          marginRight: "15px",
        }}
      />

      {showTemporarySaveButton && (
        <TemporarySaveButton
          loading={temporarySaveLoading}
          onClick={handleTemporarySaveButton}
          style={{
            marginRight: "15px",
          }}
        />
      )}
      {showSaveAndContinueButton && (
        <SaveAndContinueButton
          loading={saveAndContinueLoading}
          onClick={handleSaveAndContinue}
          style={{
            marginRight: "15px",
          }}
        />
      )}
      {showButtonComplete && (
        <ButtonComplete
          loading={buttonCompleteLoading}
          onClick={handleButtonComplete}
          style={{
            marginRight: "15px",
          }}
        />
      )}
      {showSave && <SaveButton loading={saveLoading} onClick={handleSave} />}
    </FooterGroupView>
  );
};

ButtonFooterGroup.prototype = {
  showSaveAndContinueButton: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onSaveAndContinue: PropTypes.func,
  saveLoading: PropTypes.func,
  saveAndContinueLoading: PropTypes.func,
  showButtonComplete: PropTypes.bool,
  showTemporarySaveButton: PropTypes.bool,
  onButtonComplete: PropTypes.func,
  onTemporarySave: PropTypes.func,
  buttonCompleteLoading: PropTypes.func,
  temporarySaveLoading: PropTypes.func,
  showSave: PropTypes.func,
};

export default ButtonFooterGroup;

import React from "react";
import CancelButton from "../cancel/CancelButton";
import SaveAndContinueButton from "../save-and-continue/SaveAndContinueButton";
import TemporarySaveButton from "../temporary-save/TemporarySaveButton";
import ButtonComplete from "../complete/ButtonComplete";
import SaveButton from "../save/SaveButton";
import FooterGroupView from "./FooterGroupView";
import PropTypes from "prop-types";
import ButtonAddReceipt from "../button-add-receipt/ButtonAddReceipt";
import ButtonAddReceiptAndPrint from "../button-add-receipt/ButtonAddReceiptAndPrint";

const ButtonFooterGroup = (props) => {
    const {
        // add receipt
        onAddReceipt,
        showButtomAddReceipt,
        buttonAddReceiptLoading,
        // add receipt and print
        onAddReceiptAndPrint,
        showButtomAddReceiptAndPrint,
        buttonAddReceiptAndPrintLoading,

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
    const handleAddReceipt = () => {
        if (onAddReceipt) onAddReceipt();
    };

    const handleAddReceiptAndPrint = () => {
        if (onAddReceiptAndPrint) onAddReceiptAndPrint();
    };
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
            {showButtomAddReceiptAndPrint && (
                <ButtonAddReceiptAndPrint
                    loading={buttonAddReceiptAndPrintLoading}
                    onClick={handleAddReceiptAndPrint}
                    style={{ marginRight: "15px" }}
                />
            )}

            {showButtomAddReceipt && (
                <ButtonAddReceipt
                    loading={buttonAddReceiptLoading}
                    onClick={handleAddReceipt}
                    // style={{ marginRight: "15px" }}
                />
            )}
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
            {showSave && (
                <SaveButton loading={saveLoading} onClick={handleSave} />
            )}
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
    // Receipt
    onAddReceipt: PropTypes.func,
    showButtomAddReceipt: PropTypes.bool,
    buttonAddReceiptLoading: PropTypes.bool,

    onAddReceiptAndPrint: PropTypes.func,
    showButtomAddReceiptAndPrint: PropTypes.bool,
    buttonAddReceiptLoadingAndPrint: PropTypes.bool,
};

export default ButtonFooterGroup;

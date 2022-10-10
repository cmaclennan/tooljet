import React from 'react';
import FxButton from './FxButton';

export const Toggle = ({ value, onChange, forceCodeBox, cyLabel }) => {
  return (
    <div className="row fx-container">
      <div className="col">
        <div className="field mb-3">
          <label className="form-check form-switch my-1">
            <input
              className="form-check-input"
              type="checkbox"
              onClick={() => {
                const newValue = `{{${!value}}}`;
                console.log(`acd: onChange to be called with ${newValue}`);
                onChange(newValue);
              }}
              checked={value}
              data-cy={`${cyLabel}-toggle-button`}
            />
            {/* <ToolTip label={paramLabel} meta={{}} labelClass="form-check-label" /> */}
          </label>
        </div>
      </div>
      <div className="col-auto pt-0 style-fx fx-common">
        <FxButton active={false} onPress={forceCodeBox} dataCy={cyLabel} />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { evolve, remove } from 'immutableql';
import Input from 'atoms/Input/Input';
import cn from 'classnames';
import DelayInput from 'atoms/Input/DelayInput';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

const DEFAULT_CHUNK = { value: '', delay: 200 };

import './ChunkedInput.css';
const ChunkedInput = ({ body, className, onChange, label, ...otherProps }) => {
  const passedLabel = label || '';
  const [chunksValue, setChunksValue] = useState([DEFAULT_CHUNK]);
  useEffect(() => {
    setChunksValue(body || [DEFAULT_CHUNK]);
  }, [body]);
  const updateBodyValue = (newValue) => {
    setChunksValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <div className={cn('chunked-input', className)}>
      {chunksValue?.map((chunkValue, index) => (
        <React.Fragment key={`chunk_${index}`}>
          <Input
            className={cn({ mt5: index > 0 })}
            label={[passedLabel, chunksValue.length > 1 ? `#${index + 1}` : '']
              .filter((e) => !!e)
              .join(' ')}
            value={chunkValue.value}
            multiline
            {...otherProps}
            labelClassName="g3-color"
            onChange={(value) => {
              const updatedBody = evolve(chunksValue, {
                [index]: Object.assign({}, chunkValue, { value }),
              });
              updateBodyValue(updatedBody);
            }}
            isUnsaved={
              !(body && body[index] && body[index].value === chunkValue.value)
            }
          />
          <div className="chunk-footer ffr my2">
            <DelayInput
              label="Delay"
              value={chunkValue.delay}
              onChange={(delay) => {
                const updatedBody = evolve(chunksValue, {
                  [index]: Object.assign({}, chunkValue, { delay }),
                });
                updateBodyValue(updatedBody);
              }}
              isUnsaved={
                !(body && body[index] && body[index].delay === chunkValue.delay)
              }
            />
            <div className="chunk-footer__actions ffr">
              {index > 0 ? (
                <Button
                  Icon={Icons.Trash}
                  tretiary
                  onClick={() => {
                    const updatedBody = evolve(chunksValue, {
                      [index]: remove(),
                    }).filter((em) => em !== null);
                    updateBodyValue(updatedBody);
                  }}
                  className="mr3"
                >
                  Remove chunk
                </Button>
              ) : (
                ''
              )}
              <Button
                Icon={Icons.Add}
                tretiary
                onClick={() => {
                  updateBodyValue([...chunksValue, DEFAULT_CHUNK]);
                }}
              >
                Add chunk
              </Button>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChunkedInput;

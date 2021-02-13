import React, { useState, useEffect } from 'react';
import { evolve, remove } from 'immutableql';
import Input from 'atoms/Input/Input';
import cn from 'classnames';
import DelayInput from 'atoms/Input/DelayInput';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import { useInitialState } from 'app/hooks/hooks';
import './ChunkedInput.css';

const DEFAULT_CHUNK = { value: '', delay: 200 };

const ChunkedInput = ({
  body,
  initialBody,
  className,
  onChange,
  label,
  noChunks,
  noDelay,
  ...otherProps
}) => {
  const passedLabel = label || '';
  const [chunksValue, setChunksValue] = useState(
    body || initialBody || [DEFAULT_CHUNK],
  );
  useEffect(() => {
    setChunksValue(body || initialBody || [DEFAULT_CHUNK]);
  }, [body, initialBody]);
  const updateBodyValue = (newValue) => {
    setChunksValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <div className={cn('chunked-input', className)}>
      {chunksValue?.map((chunkValue, index) => (
        <React.Fragment key={`chunk_${index}`}>
          <Input
            className={cn('chunked-input__input', { mt5: index > 0 })}
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
              !(
                initialBody &&
                initialBody[index] &&
                initialBody[index].value === chunkValue.value
              )
            }
            reset={() => {
              const updatedBody = evolve(chunksValue, {
                [index]: Object.assign({}, chunkValue, {
                  value:
                    (initialBody &&
                      initialBody[index] &&
                      initialBody[index].value) ||
                    '',
                }),
              });
              updateBodyValue(updatedBody);
            }}
          />
          <div className="chunk-footer ffr my2">
            {!noDelay && (
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
                  !(
                    initialBody &&
                    initialBody[index] &&
                    initialBody[index].delay === chunkValue.delay
                  )
                }
                reset={() => {
                  const updatedBody = evolve(chunksValue, {
                    [index]: Object.assign({}, chunkValue, {
                      delay:
                        (initialBody &&
                          initialBody[index] &&
                          initialBody[index].delay) ||
                        DEFAULT_CHUNK.delay,
                    }),
                  });
                  updateBodyValue(updatedBody);
                }}
              />
            )}
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
              {!noChunks && (
                <Button
                  className="add-chunk animate_add"
                  Icon={Icons.Add}
                  tretiary
                  onClick={() => {
                    updateBodyValue([...chunksValue, DEFAULT_CHUNK]);
                  }}
                >
                  Add chunk
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChunkedInput;

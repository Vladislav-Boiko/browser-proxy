import React from 'react';
import URLParameter from './UrlParameter/UrlParameter';
import { METHODS } from '../../../utils/constants';
import cn from 'classnames';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Input from '../../atoms/Input/Input';
import Section from '../../atoms/Section/Section';

import './Url.css';
class Url extends React.Component {
  state = {
    method: METHODS[0],
    urlValue: '',
    urlParams: [{ key: '', value: '', delimeter: '' }],
  };

  render() {
    const { method, urlParams } = this.state;
    const { url, className, onChange, initialMethod, initialUrl } = this.props;
    return (
      <React.Fragment>
        <div className={cn('wmax ffr', className)}>
          <Dropdown
            label="Type"
            initialState={method || METHODS.GET}
            options={METHODS.map((name) => ({ name, value: name }))}
            onChange={(newMethod) => {
              this.setState({ method: newMethod });
              onChange && onChange({ method: newMethod });
            }}
            isUnsaved={initialMethod && initialMethod !== method}
          />
          <Input
            className="url"
            value={url}
            onChange={(value) => {
              this.onUrlValueChange(value);
              onChange && onChange({ url: value });
            }}
            label="URL"
            isUnsaved={initialUrl && initialUrl !== url}
          />
        </div>

        <fieldset className="queryParameters wmax">
          <Section
            header={
              <legend className="queryParameters__legend label_medium">
                Query Parameters
              </legend>
            }
            isInitiallyOpen={true}
          >
            {urlParams.map(({ key, value, isDisabled }, index) => (
              <URLParameter
                key={`url-parameter-${index}`}
                keyName={key}
                value={value}
                isDisabled={isDisabled}
                setKeyName={(newKeyName) =>
                  this.onQueryKeyChange(newKeyName, index)
                }
                setValue={(newValue) =>
                  this.onQueryValueChange(newValue, index)
                }
                toggleDisabled={() => this.onQueryToggleDisabled(index)}
                remove={
                  index !== urlParams.length - 1 &&
                  (() => this.onQueryRemove(index))
                }
                hasLabels={!index}
              />
            ))}
          </Section>
        </fieldset>
      </React.Fragment>
    );
  }

  addEmptyParams(params) {
    return [...params, { key: '', value: '', delimeter: '' }];
  }

  updateUrlParams(oldUrlParams, newUrlParams) {
    let merged = [];
    for (
      let i = 0;
      i < Math.max(oldUrlParams.length, newUrlParams.length);
      ++i
    ) {
      if (oldUrlParams[i] && oldUrlParams[i].isDisabled) {
        merged.push(oldUrlParams[i]);
      }
      if (newUrlParams[i]) {
        merged.push(newUrlParams[i]);
      }
    }
    return merged;
  }

  static parseUrl(url) {
    if (!url) {
      return {
        urlValue: '',
        urlParams: [{ key: '', value: '', delimeter: '' }],
      };
    }
    let splitted = url.split('?');
    let urlValue = splitted.shift();
    let urlParams = [{ key: '', value: '', delimeter: '' }];
    if (splitted.length) {
      urlValue =
        urlValue[urlValue.length - 1] === '?' ? urlValue : urlValue + '?';
      const withoutBase = splitted.join('?');
      urlParams = withoutBase
        ? withoutBase.split('&').map((pair) => {
            let splitted = pair.split('=');
            const key = splitted.shift();
            const delimeter = splitted.length ? '=' : '';
            const value = splitted.join('=');
            return { key, value, delimeter };
          })
        : [{ key: '', value: '', delimeter: '' }];
    }
    return { urlValue, urlParams };
  }

  static getUrlString(urlValue, urlParams) {
    urlValue =
      urlValue[urlValue.length - 1] === '?' ? urlValue : urlValue + '?';
    return urlParams.length > 1
      ? `${urlValue}` +
          urlParams
            .filter(
              ({ isDisabled }, index) =>
                !isDisabled && index !== urlParams.length - 1,
            )
            .map(
              ({ key, value, delimeter }) =>
                `${key || ''}${delimeter}${value || ''}`,
            )
            .join('&')
      : urlValue;
  }

  setMethod(method) {
    this.setState({ method });
  }

  setUrl(urlValue) {
    this.setState({ urlValue });
  }

  setUrlParams(urlParams) {
    const { urlValue } = this.state;
    if (
      urlParams.filter(({ isDisabled }) => !isDisabled).length > 1 &&
      urlValue[urlValue.length - 1] !== '?'
    ) {
      this.setUrl(`${urlValue}?`);
    }
    this.setState({ urlParams });
  }

  onUrlValueChange(value) {
    const { urlParams } = this.state;
    const parsed = Url.parseUrl(value);
    this.setUrl(parsed.urlValue);
    let updated = this.updateUrlParams(urlParams, parsed.urlParams);
    updated = this.addEmptyParams(updated);
    this.setUrlParams(updated);
  }

  onQueryKeyChange(newName, index) {
    const { urlValue, urlParams } = this.state;
    let urlParamsCopy = [...urlParams];
    urlParamsCopy[index].key = newName;
    if (index === urlParams.length - 1) {
      urlParamsCopy = this.addEmptyParams(urlParamsCopy);
    }
    this.setUrlParams(urlParamsCopy);
    this.props.onChange &&
      this.props.onChange({ url: Url.getUrlString(urlValue, urlParamsCopy) });
  }

  onQueryValueChange(value, index) {
    const { urlValue, urlParams } = this.state;
    let urlParamsCopy = [...urlParams];
    if (!urlParamsCopy[index].value && !!value) {
      urlParamsCopy[index].delimeter = '=';
    }
    if (!!urlParamsCopy[index].value && !value) {
      urlParamsCopy[index].delimeter = '';
    }
    urlParamsCopy[index].value = value;
    if (index === urlParams.length - 1) {
      urlParamsCopy = this.addEmptyParams(urlParamsCopy);
    }
    this.setUrlParams(urlParamsCopy);
    this.props.onChange &&
      this.props.onChange({ url: Url.getUrlString(urlValue, urlParamsCopy) });
  }

  onQueryToggleDisabled(index) {
    const { urlValue } = this.state;
    let urlParamsCopy = [...this.state.urlParams];
    urlParamsCopy[index].isDisabled = !urlParamsCopy[index].isDisabled;
    this.setUrlParams(urlParamsCopy);
    this.props.onChange &&
      this.props.onChange({ url: Url.getUrlString(urlValue, urlParamsCopy) });
  }

  onQueryRemove(index) {
    let urlParamsCopy = [...this.state.urlParams];
    urlParamsCopy.splice(index, 1);
    this.setUrlParams(urlParamsCopy);
  }

  static getDerivedStateFromProps(props, state) {
    let url = Url.getUrlString(state.urlValue, state.urlParams);
    let method = state.method;
    if ((props.url === url && props.method === method) || !props.onChange) {
      // No state update needed
      return null;
    }
    if (props.url !== url) {
      url = props.url;
    }
    if (props.method !== method) {
      method = props.method;
    }
    return { method, ...Url.parseUrl(url) };
  }
}

export default Url;

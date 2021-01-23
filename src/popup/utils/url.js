import micromatch from 'micromatch';
import { addDomain } from 'store/nodes/actions';
import { selectNode } from 'store/selected/actions';
import store from 'store/store';
import { v4 as uuid } from 'uuid';
import { TYPES } from 'organisms/TreeView/TreeView.container';

export const hasUrlMatch = (url, activeUrls) =>
  micromatch.isMatch(url, activeUrls);

export const createDefaultActiveUrl = (url) => `${url}*`;

export const selectInitialDomain = (tabUrl) => {
  const domainName = new URL(tabUrl)?.hostname || tabUrl;
  const id = uuid();
  const defaultActiveUrl = createDefaultActiveUrl(tabUrl);
  store.dispatch(
    addDomain({
      name: domainName,
      id,
      type: TYPES.DOMAIN,
      isUnsaved: true,
      isOn: false,
      activeUrls: [defaultActiveUrl],
    }),
  );
  store.dispatch(selectNode(id));
};

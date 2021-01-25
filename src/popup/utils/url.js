import * as micromatch from 'micromatch';
import { addDomain } from 'store/nodes/actions';
import { selectNode } from 'store/selected/actions';
import store from 'store/store';
import { v4 as uuid } from 'uuid';
import { TYPES } from 'organisms/TreeView/TreeView.container';
import { getDomainIdForActiveUrl } from 'store/activeWindows/selectors';

export const hasUrlMatch = (url, activeUrls) =>
  micromatch.isMatch(url, activeUrls);

export const createDefaultActiveUrl = (url) => {
  let origin = url;
  try {
    const parsed = new URL(url);
    origin = parsed.origin;
  } catch (e) {
    // Do nothing.
  }
  return `${origin}*`;
};

export const selectInitialDomain = (tabUrl) => {
  const foundDomainId = getDomainIdForActiveUrl(tabUrl)(store.getState());
  if (foundDomainId) {
    store.dispatch(selectNode(foundDomainId));
  } else {
    const domainName = new URL(tabUrl)?.hostname || tabUrl;
    const id = uuid();
    const defaultActiveUrl = createDefaultActiveUrl(tabUrl);
    store.dispatch(
      addDomain({
        name: domainName,
        id,
        type: TYPES.DOMAIN,
        isUnsaved: true,
        isFirstOpen: true,
        isOn: false,
        activeUrls: [defaultActiveUrl],
      }),
    );
    store.dispatch(selectNode(id));
  }
};

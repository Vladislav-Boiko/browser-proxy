export const updateWindowRequests = (oldWindowRequests, updateRequests) => {
  // Update requests that are already present in state
  const updated = oldWindowRequests.map((request) => {
    let anUpdate = updateRequests.find(({ id }) => id === request.id);
    if (anUpdate) {
      anUpdate = mapRequestFields(anUpdate);
      return addRequest(request, anUpdate);
    }
    return request;
  });
  // Add requests that are not yet present in state
  const newRequests = updateRequests
    .filter(
      ({ id }) =>
        !oldWindowRequests.find((existingRequest) => existingRequest.id === id),
    )
    .map(createNewRequest);
  return [...updated, ...newRequests];
};

const mapRequestFields = (request) => {
  const mapped = Object.assign({}, request);
  if (request.status !== undefined) {
    mapped.responseCode = request.status;
    delete mapped.status;
  }
  if (request.type !== undefined) {
    mapped.method = request.type;
    delete mapped.type;
  }
  return mapped;
};

const createNewRequest = (requestData) => {
  let mapped = mapRequestFields(requestData);
  let responseBody = '';
  let delay = 0;
  if (mapped.response) {
    responseBody = mapped.response;
  }
  if (mapped.sentTimestamp && mapped.chunkTimestamp) {
    delay = mapped.chunkTimestamp - mapped.sentTimestamp;
  }
  mapped.responseBody = [{ delay, value: responseBody }];
  delete mapped.response;
  return mapped;
};

const addRequest = (old, update) => {
  let delay = 0;
  const previousChunkMoment = old.chunkTimestamp || old.sentTimestamp;
  if (previousChunkMoment && update.chunkTimestamp) {
    delay = update.chunkTimestamp - previousChunkMoment;
  }
  const combinedPreviousValue =
    old.responseBody?.map(({ value }) => value).join('') || '';
  const newChunkValue =
    update.response?.replace(combinedPreviousValue, '') || '';
  let responseBody = old.responseBody || [];
  if (responseBody && responseBody.length > 0) {
    const lastElement = responseBody[responseBody.length - 1];
    if (!lastElement?.value && !lastElement?.delay) {
      responseBody.pop();
    } else if (!lastElement?.value) {
      const last = responseBody.pop();
      delay += last.delay;
    }
  }
  if (newChunkValue || delay) {
    responseBody.push({ delay, value: newChunkValue });
  }
  if (!responseBody || !responseBody.length) {
    responseBody = [{ delay: 0, value: 0 }];
  }
  return {
    ...old,
    ...update,
    responseBody,
  };
};

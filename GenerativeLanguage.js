class _CoreFunctions {
    /** 
   * @constructor 
   * @param {Object} options to construct the client
   * @return {_TextServiceClient}
  */
  constructor(options) {
    this._auth = options.authClient;
  }

  _callAPI(requestBody, model) {
    const self = this;

    // Values universal to PaLM API calls
    const url = `https://generativelanguage.googleapis.com/v1beta2/${model}`;
    const params = {
      'method': 'POST',
      'contentType': 'application/json',
      'payload': JSON.stringify(requestBody),
      'muteHttpExceptions': true
    };

    return new Promise(function (resolve, reject) {
      try {
        var result = UrlFetchApp.fetch(self._buildUrl(url, { key: self._auth }), params);
        resolve(result.getContentText());
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  _buildUrl(url, params) {
    const queryString = Object.keys(params).map(function (p) {
      return [encodeURIComponent(p), encodeURIComponent(params[p])].join("=");
    }).join("&");
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + queryString;
  }
}
var CoreFunctions = _CoreFunctions;


/**
 * TextServiceClient is used to interface the PaLM API.
 */
class _TextServiceClient extends CoreFunctions {
  /** 
   * @constructor 
   * @param {Object} options to construct the client
   * @return {_TextServiceClient}
  */
  constructor(options) {
    super(options)
  }

  // -------------------
  // -- Service calls --
  // -------------------
  /**
   * Generates a response from the model given an input message.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.model
   *   Required. The model name to use with the format name=models/{model}.
   * @param {google.ai.generativelanguage.v1beta2.TextPrompt} request.prompt
   *   Required. The free-form input text given to the model as a prompt.
   *
   *   Given a prompt, the model will generate a TextCompletion response it
   *   predicts as the completion of the input text.
   * @param {number} request.temperature
   *   Controls the randomness of the output.
   *   Note: The default value varies by model, see the `Model.temperature`
   *   attribute of the `Model` returned the `getModel` function.
   *
   *   Values can range from [0.0,1.0],
   *   inclusive. A value closer to 1.0 will produce responses that are more
   *   varied and creative, while a value closer to 0.0 will typically result in
   *   more straightforward responses from the model.
   * @param {number} request.candidateCount
   *   Number of generated responses to return.
   *
   *   This value must be between [1, 8], inclusive. If unset, this will default
   *   to 1.
   * @param {number} request.maxOutputTokens
   *   The maximum number of tokens to include in a candidate.
   *
   *   If unset, this will default to 64.
   * @param {number} request.topP
   *   The maximum cumulative probability of tokens to consider when sampling.
   *
   *   The model uses combined Top-k and nucleus sampling.
   *
   *   Tokens are sorted based on their assigned probabilities so that only the
   *   most liekly tokens are considered. Top-k sampling directly limits the
   *   maximum number of tokens to consider, while Nucleus sampling limits number
   *   of tokens based on the cumulative probability.
   *
   *   Note: The default value varies by model, see the `Model.top_p`
   *   attribute of the `Model` returned the `getModel` function.
   * @param {number} request.topK
   *   The maximum number of tokens to consider when sampling.
   *
   *   The model uses combined Top-k and nucleus sampling.
   *
   *   Top-k sampling considers the set of `top_k` most probable tokens.
   *   Defaults to 40.
   *
   *   Note: The default value varies by model, see the `Model.top_k`
   *   attribute of the `Model` returned the `getModel` function.
   * @param {number[]} request.safetySettings
   *   A list of unique `SafetySetting` instances for blocking unsafe content.
   *
   *   that will be enforced on the `GenerateTextRequest.prompt` and
   *   `GenerateTextResponse.candidates`. There should not be more than one
   *   setting for each `SafetyCategory` type. The API will block any prompts and
   *   responses that fail to meet the thresholds set by these settings. This list
   *   overrides the default settings for each `SafetyCategory` specified in the
   *   safety_settings. If there is no `SafetySetting` for a given
   *   `SafetyCategory` provided in the list, the API will use the default safety
   *   setting for that category.
   * @param {string[]} request.stopSequences
   *   The set of character sequences (up to 5) that will stop output generation.
   *   If specified, the API will stop at the first appearance of a stop
   *   sequence. The stop sequence will not be included as part of the response.
   */
  generateText(request) {
    let { model, ...requestBody } = request;
    return super._callAPI(requestBody, model+':generateText');
  }


}
var TextServiceClient = _TextServiceClient;

/**
 * DiscussServiceClient is used to interface the PaLM API.
 */
class _DiscussServiceClient extends CoreFunctions{
  /** 
   * @constructor 
   * @param {Object} options to construct the client
   * @return {_TextServiceClient}
  */
  constructor(options) {
    super(options)
  }

  // -------------------
  // -- Service calls --
  // -------------------
  /**
  * Generates a response from the model given an input `MessagePrompt`.
  *
  * @param {Object} request
  *   The request object that will be sent.
  * @param {string} request.model
  *   Required. The name of the model to use.
  *
  *   Format: `name=models/{model}`.
  * @param {google.ai.generativelanguage.v1beta2.MessagePrompt} request.prompt
  *   Required. The structured textual input given to the model as a prompt.
  *
  *   Given a
  *   prompt, the model will return what it predicts is the next message in the
  *   discussion.
  * @param {number} [request.temperature]
  *   Optional. Controls the randomness of the output.
  *
  *   Values can range over `[0.0,1.0]`,
  *   inclusive. A value closer to `1.0` will produce responses that are more
  *   varied, while a value closer to `0.0` will typically result in
  *   less surprising responses from the model.
  * @param {number} [request.candidateCount]
  *   Optional. The number of generated response messages to return.
  *
  *   This value must be between
  *   `[1, 8]`, inclusive. If unset, this will default to `1`.
  * @param {number} [request.topP]
  *   Optional. The maximum cumulative probability of tokens to consider when
  *   sampling.
  *
  *   The model uses combined Top-k and nucleus sampling.
  *
  *   Nucleus sampling considers the smallest set of tokens whose probability
  *   sum is at least `top_p`.
  * @param {number} [request.topK]
  *   Optional. The maximum number of tokens to consider when sampling.
  *
  *   The model uses combined Top-k and nucleus sampling.
  *
  *   Top-k sampling considers the set of `top_k` most probable tokens.
  * @param {object} [options]
  *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
  * @returns {Promise} - The promise which resolves to an array.
  *   The first element of the array is an object representing {@link protos.google.ai.generativelanguage.v1beta2.GenerateMessageResponse|GenerateMessageResponse}.
  *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
  *   for more details and examples.
  * @example <caption>include:samples/generated/v1beta2/discuss_service.generate_message.js</caption>
  * region_tag:generativelanguage_v1beta2_generated_DiscussService_GenerateMessage_async
  */
  generateMessage(request) {
    let { model, ...requestBody } = request;
    return super._callAPI(requestBody, model+':generateMessage');
  }
}
var DiscussServiceClient = _DiscussServiceClient;


/**
 * GoogleAuth used to mock GoogleAuth in Apps Script.
 */
class _GoogleAuth {
  fromAPIKey(api_key) {
    return api_key
  }
}
var GoogleAuth = _GoogleAuth;


// Modified from Bruce Mcpherson https://github.com/brucemcpherson/cPromisePolyfill
var Promise,
  setTimeout = setTimeout || function (func, ms) {
    Utilities.sleep(ms);
    func();
  };
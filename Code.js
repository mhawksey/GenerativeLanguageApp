
function testGenerateTextCall() {

  const MODEL_NAME = "models/text-bison-001";
  const API_KEY = process.env.API_KEY;

  const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

  console.log(client._auth)

  const promptString = "Repeat after me: one, two,";
  const stopSequences = [];

  client.generateText({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.7,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    // optional, maximum number of output tokens to generate
    max_output_tokens: 1024,
    // optional, sequences at which to stop model generation
    stop_sequences: stopSequences,
    // optional, safety settings
    safety_settings: [{ "category": "HARM_CATEGORY_DEROGATORY", "threshold": 1 }, { "category": "HARM_CATEGORY_TOXICITY", "threshold": 1 }, { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 2 }, { "category": "HARM_CATEGORY_SEXUAL", "threshold": 2 }, { "category": "HARM_CATEGORY_MEDICAL", "threshold": 2 }, { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 2 }],
    prompt: {
      text: promptString,
    },
  }).then(result => {
    console.log(result);
  });
}

function testGenerateMessageCall() {
  const MODEL_NAME = "models/chat-bison-001";
  const API_KEY = process.env.API_KEY;

  const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

  const context = "Be an alien that lives on one of Jupiter's moons";
  const examples = [
    {
      "input": {
        "content": "How's it going?"
      },
      "output": {
        "content": "I am doing well, thank you for asking. I am currently enjoying the beautiful view of Jupiter from my home on Europa. The atmosphere is very thin here, so I can see the stars very clearly. The surface of Europa is also very interesting. It is covered in ice, but there are cracks in the ice that reveal a liquid ocean below. Scientists believe that this ocean may contain life, so I am very excited to learn more about it.\n\nHow are you doing today?"
      }
    }
  ];
  const messages = [];

  messages.push({ "content": "I'd like to visit, what should I do?" });

  client.generateMessage({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.9,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    prompt: {
      // optional, sent on every request and prioritized over history
      context: context,
      // optional, examples to further finetune responses
      examples: examples,
      // required, alternating prompt/response messages
      messages: messages,
    },
  }).then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
}

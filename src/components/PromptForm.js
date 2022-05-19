import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'

export default function PromptForm(props) {
  const [prompt, setPrompt] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('text-curie-001');

  const engineList = ['text-davinci-002', 'text-curie-001', 'text-babbage-001', 'text-ada-001'];

  function handleSubmit(e) {
    e.preventDefault();
    getResponse(prompt);
    setPrompt('');
  }

  function getResponse(prompt) {
    props.setLoading(true);
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch(`/${selectedEngine}/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,

      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        props.setResponseList(prevState => [...prevState,
        {
          prompt: prompt,
          response: data.choices[0].text,
          engine: selectedEngine
        }])
        props.setLoading(false);
      }

      );
  }
  return (
    <div className='app-container-item'>
      <h1><b>Fun with AI</b></h1>
      <Form onSubmit={handleSubmit}>
        <b>Enter prompt</b>
        <Form.Group>
          <textarea className="form-control" rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ float: 'right', marginTop: '0.5em', width: '20%' }}>
          Submit
        </Button>
        <DropdownButton variant="secondary" menuVariant="dark" title={selectedEngine} style={{ float: 'left', marginTop: '0.5em', width: '20%' }}>
          {engineList.map((engine, idx) =>
            <div key={idx}>
              {engine !== selectedEngine && <Dropdown.Item onClick={() => setSelectedEngine(engine)}>{engine}</Dropdown.Item>}
            </div>

          )}
        </DropdownButton>
      </Form>

    </div>


  )
}

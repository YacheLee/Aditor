import React from 'react';
import Component from './Component';

export default {
  title: 'Aditor'
};

export const EnglishNews = () => {
  const defaultValue = [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(30, 30, 30)' } }],
          text: 'What do the cables say?'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'The Washington Post newspaper reported information obtained from diplomatic cables on 14 April. They show that, in 2018, US science diplomats were sent on repeated visits to a Chinese research facility.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text: 'Officials '
        },
        {
          type: 'text',
          marks: [
            { type: 'strong' },
            {
              type: 'link',
              attrs: {
                href:
                  'https://www.washingtonpost.com/opinions/2020/04/14/state-department-cables-warned-safety-issues-wuhan-lab-studying-bat-coronaviruses/',
                title: null
              }
            },
            { type: 'textColor', attrs: { color: 'rgb(34, 34, 34)' } }
          ],
          text: 'sent two warnings to Washington about the lab.'
        },
        {
          type: 'text',
          text:
            ' The column says the officials were worried about safety and management weaknesses at the Wuhan Institute of Virology (WIV) and called for more help.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            "It also claims diplomats were concerned the lab's research on bat coronaviruses could risk a new Sars-like pandemic. The newspaper says the cables fuelled more recent discussions in the US government about whether the WIV or another lab in Wuhan could have been the source of the virus behind the current pandemic."
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text: 'In addition, Fox News issued '
        },
        {
          type: 'text',
          marks: [
            { type: 'strong' },
            {
              type: 'link',
              attrs: {
                href:
                  'https://www.foxnews.com/politics/coronavirus-wuhan-lab-china-compete-us-sources',
                title: null
              }
            },
            { type: 'textColor', attrs: { color: 'rgb(34, 34, 34)' } }
          ],
          text: 'a report promoting the lab origin theory.'
        }
      ]
    },
    { type: 'paragraph' },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'The outbreak came to light late last year when early cases were linked to a food market in Wuhan. But despite rampant online speculation, there is no evidence of any kind that the Sars-CoV-2 virus (which causes Covid-19) was released accidentally from a lab.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text: 'On 30 April, '
        },
        {
          type: 'text',
          marks: [
            { type: 'strong' },
            {
              type: 'link',
              attrs: {
                href:
                  'https://www.dni.gov/index.php/newsroom/press-releases/item/2112-intelligence-community-statement-on-origins-of-covid-19',
                title: null
              }
            },
            { type: 'textColor', attrs: { color: 'rgb(34, 34, 34)' } }
          ],
          text:
            "the US national intelligence director's office issued a statement"
        },
        {
          type: 'text',
          text:
            ' rejecting the most extreme of the conspiracy theories about the virus\'s origins - that it was conceived as a bioweapon. It said the intelligence community was still examining whether the outbreak began "through contact with infected animals or if it was the result of an accident at a laboratory in Wuhan".'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'But President Donald Trump appeared to undercut that statement '
        },
        {
          type: 'text',
          marks: [
            { type: 'strong' },
            {
              type: 'link',
              attrs: {
                href: 'https://www.bbc.co.uk/news/world-us-canada-52496098',
                title: null
              }
            },
            { type: 'textColor', attrs: { color: 'rgb(34, 34, 34)' } }
          ],
          text: 'in a press briefing the same day'
        },
        {
          type: 'text',
          text:
            '. Asked whether he had seen anything to make him think the WIV was the source of the outbreak, he replied: "Yes, I have. Yes, I have."'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'China rejects the idea and has criticised the US response to the crisis.'
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(30, 30, 30)' } }],
          text: 'What kind of security measures do labs use?'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'Laboratories studying viruses and bacteria follow a system known as the BSL standards, where BSL stands for Biosafety Level.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'There are four levels, which depend on the types of biological agents being studied and the containment precautions needed to isolate them.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'Biosafety Level 1 (BSL-1) is the lowest and is used by labs studying well-known biological agents that pose no threat to humans.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'The containment precautions increase through the levels until you arrive at Biosafety Level 4 (BSL-4) which is the highest, and reserved for labs dealing with the most dangerous pathogens for which there are few available vaccines or treatments: ebola, Marburg virus and - in the case of just two institutes in the US and Russia - smallpox.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            'The BSL standards are applied internationally, but with some cosmetic variations.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'textColor', attrs: { color: 'rgb(64, 64, 64)' } }],
          text:
            '"The Russians, for instance, label their highest containment labs as 1 and the lowest containment labs as 4, so the exact opposite of the standard, but the actual practices and infrastructure requirements are similar," says Dr Filippa Lentzos, a biosecurity expert at King\'s College London.'
        }
      ]
    }
  ];

  return <Component defaultValue={defaultValue} />;
};

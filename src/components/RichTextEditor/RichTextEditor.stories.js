import React, {Fragment, useState} from "react";
import {withKnobs} from "@storybook/addon-knobs";
import RichTextEditor from './RichTextEditor';

export default {
    title: "RichTextEditor",
    decorators: [withKnobs],
    parameters: {
        info: {
            inline: true
        }
    }
};

export const English = () => {
    const [value, setValue] = useState([
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Home tests for coronavirus should be available to ',
                    type: 'text'
                },
                {
                    marks: [
                        {
                            attrs: {
                                href: 'https://www.nhs.uk',
                                title: null
                            },
                            type: 'link'
                        },
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'NHS',
                    type: 'text'
                },
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: ' staff across the UK "very soon", according to the government\'s testing co-ordinator.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Prof John Newton acknowledged that health and care workers have struggled to access testing sites.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'The government said lack of "demand" rather than capacity was behind the slow growth in testing numbers.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'But the British Medical Association (BMA), the Royal College of Nursing (RCN) and Unison have challenged this.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'They say long drives or difficulty accessing drive-through sites without a car were preventing staff from being tested.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(34, 34, 34)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Can I get tested?',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(34, 34, 34)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Are coronavirus tests flawed?',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'There are 27 testing centres in total and there are reports of some staff having to drive hundreds of miles to reach their nearest site.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'The government says there is capacity to do about 40,000 tests a day across the UK, but only about half - 20,000 tests - are actually being processed.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'A Downing Street spokesperson said the government was "absolutely standing by" its target of carrying out 100,000 tests per day by the end of April.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            attrs: {
                level: 2
            },
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(30, 30, 30)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Barriers',
                    type: 'text'
                }
            ],
            type: 'heading'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'The prospect of a home test offers some hope when it comes to another major barrier for staff: the test has to be done within the first few days of experiencing symptoms.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Some have been missing out because people have been too unwell to drive to a testing centre, according to Saffron Cordery, head of NHS Providers, which represents hospital trusts.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'But overall, the proportion of staff who are eligible to be tested is actually quite small, she said.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'At the moment, the priority is to test key workers who are off work either because they have symptoms or someone in their household does.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Ms Cordery estimated that roughly 150,000 staff are off at the moment, but about half of those will be suffering from other illnesses. Some will be shielding because of long-term conditions.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'She said the rationale for the government\'s 100,000 tests a day target wasn\'t "entirely clear", but welcomed the "challenge" it provided.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        },
        {
            content: [
                {
                    marks: [
                        {
                            attrs: {
                                color: 'rgb(64, 64, 64)'
                            },
                            type: 'textColor'
                        }
                    ],
                    text: 'Public Health England (PHE) is trialling a system of UK-wide self-testing for key workers, but until that\'s ready to roll out, most still can\'t be tested in their homes.',
                    type: 'text'
                }
            ],
            type: 'paragraph'
        }
    ]);

    return <Fragment>
        <RichTextEditor defaultValue={value} onChange={setValue}/>
    </Fragment>
};

export const TraditionalChinese = () => {
    const [value, setValue] = useState( [
        {
            type: "paragraph",
            "content": [
                {
                    type: "text",
                    "text": "2020.04.06 11:44 MAIL通報人(之)"
                }
            ]
        },
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    "text": "由於目前協會案件量過載與人力問題，TSPCA將在4/1起暫時關閉案件通報系統，並於6/1重新開啟，在這段期間內將不受理任何新案件的通報，但調查部門會持續處理已通報之案件，並同步進行部門檢討、統整、以及充分訓練新到職之調查員；民眾若有發現疑似動物虐待案件，仍然可以與我們聯繫，我們將會提供您相關諮詢：包含可嘗試的處理方式及法律相關資訊，包含 : 蒐證技巧、與飼主溝通技巧、如何通報地方主管機關與後續追蹤方法等資訊；若您有需要，可以在和我聯繫，謝謝您。"
                }
            ]
        }
    ]);
    return <Fragment>
        <RichTextEditor defaultValue={value} onChange={setValue}/>
    </Fragment>
};

export const Empty = () => {
    const [value, setValue] = useState([]);
    return <Fragment>
        <RichTextEditor defaultValue={value} onChange={setValue}/>
    </Fragment>
};

export const Null = () => {
    const [value, setValue] = useState(null);
    return <Fragment>
        <RichTextEditor defaultValue={value} onChange={setValue}/>
    </Fragment>
};

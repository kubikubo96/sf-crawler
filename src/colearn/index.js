import puppeteer from 'puppeteer'
import axios from 'axios'
import 'dotenv/config'


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // args: ['--window-size=1900,1000'],
  });
  const page = await browser.newPage();

  const TIME_OUT = 1000;
  const TIME_OUT_LONG = 5000;

  const listCategory = [
    { 'idx': 0, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-toan-s5af3ead5f4ed8c11759c1ade.html', 'name': 'toan' },
    { 'idx': 1, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-ly-s5af3ead5f4ed8c11759c1add.html', 'name': 'ly' },
    { 'idx': 2, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-hoa-s5af3ead5f4ed8c11759c1adc.html', 'name': 'hoa' },
    { 'idx': 3, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-sinh-s5af3ead5f4ed8c11759c1adb.html', 'name': 'sinh' },
    { 'idx': 4, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-van-s5d14722fbcafcc004810c09f.html', 'name': 'van' },
    { 'idx': 5, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-tieng-anh-s5b7f644c5b9305855ffadced.html', 'name': 'anh' },
    { 'idx': 6, 'url': 'https://vungoi.vn/lop-12/bai-tap-tieng-anh-moi-s5f1e3ac59d96250022154460.html', 'name': 'anh-new' },
    { 'idx': 7, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-su-s5b3d7dd3d9e263cf2e5a16c3.html', 'name': 'su' },
    { 'idx': 8, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-dia-s5b3d7ddcd9e263cf2e5a16c4.html', 'name': 'dia' },
    { 'idx': 9, 'url': 'https://vungoi.vn/lop-12/bai-tap-mon-gdcd-s5d61eaf3ea5cb900220fa953.html', 'name': 'gdcd' },
  ];
  const class_name = 'lop-12';

  var total = 0;

  var limit_subjects = parseInt(process.env.LIMIT_SUBJECTS);
  var limit_topics = parseInt(process.env.LIMIT_TOPICS);
  var limit_questions = parseInt(process.env.LIMIT_QUESTIONS);

  var number_subjects = 0;
  var number_topics = parseInt(process.env.NUMBER_TOPICS);
  var number_questions = parseInt(process.env.NUMBER_QUESTIONS);

  var topic_parent_name = '';
  var topic_name = '';

  /**
   * While list menu
   */
  while (1) {
    if (page.url() == 'about:blank') {
      try {
        await page.goto(listCategory[number_subjects].url)
      } catch (error) {
        try {
          await page.reload({ timeout: TIME_OUT_LONG })
        } catch (error) {
          sendTele(error, [], 'ERROR FOR RELOAD PAGE', page.url(), 57);
        }
      }
    }
    /**
     * B1. Go 1 subject
     */
    try {
      await page.goto(listCategory[number_subjects].url)
    } catch (error) {
      try {
        await page.reload({ timeout: TIME_OUT_LONG })
      } catch (error) {
        sendTele(error, [], 'ERROR FOR RELOAD PAGE', page.url(), 57);
      }
    }

    /**
     * While list topic
     */
    while (1) {
      if (page.url() == 'about:blank') {
        try {
          await page.goto(listCategory[number_subjects].url)
        } catch (error) {
          try {
            await page.reload({ timeout: TIME_OUT_LONG })
          } catch (error) {
            sendTele(error, [], 'ERROR FOR RELOAD PAGE', page.url(), 57);
          }
        }
      }
      /**
       * B2. Go 1 topic
       */
      try {
        const elmTopics = '.list-chapters .sub-string';
        await page.waitForSelector(elmTopics, { timeout: TIME_OUT }).then(async () => {

          limit_topics = await page.$$eval(elmTopics, (elm) => elm.length);

          topic_name = await page.$$eval(elmTopics, (elm, number_topics) => {
            return elm[number_topics].getAttribute('title')
          }, number_topics);


          topic_parent_name = await page.evaluate(async (elmTopics, number_topics) => {
            let elm = document.querySelectorAll(elmTopics)[number_topics]
            let elmParent = elm.closest('.chapter-item').querySelectorAll('a')[0];
            return elmParent.textContent;
          }, elmTopics, number_topics)


          await page.$$eval(elmTopics, (element, number_topics) => {
            element[number_topics].click()
          }, number_topics);
        });
      } catch (error) {
        sendTele(error, [], 'waitForSelector elmTopics', page.url(), 91);
      }

      /**
       * While list question
       */
      while (1) {
        if (page.url() == 'about:blank') {
          try {
            await page.goto(listCategory[number_subjects].url)
          } catch (error) {
            try {
              await page.reload({ timeout: TIME_OUT_LONG })
            } catch (error) {
              sendTele(error, [], 'ERROR FOR RELOAD PAGE', page.url(), 57);
            }
          }
        }
        /**
         * B3. Go 1 question
         */
        try {
          const elmQuestions = '#list_relate-quiz .quiz-relate-item a';
          await page.waitForSelector(elmQuestions, { timeout: TIME_OUT }).then(async () => {

            limit_questions = await page.$$eval(elmQuestions, (elm) => elm.length);

            await page.$$eval(elmQuestions, (element, number_questions) => {
              element[number_questions].click()
            }, number_questions);

            console.log("[subjects] limit:  " + limit_subjects + ", number:  " + number_subjects);
            console.log("[topics] limit:    " + limit_topics + ", number:  " + number_topics);
            console.log("[questions] limit: " + limit_questions + ", number: " + number_questions);
          });

        } catch (error) { }

        /**
         * B4. Get data questions
         */
        // try {
        let elmName = '#quiz-single .vn-tit-question strong';
        let elmTag = '#quiz-single .vn-tit-question .clf';
        let elmQuestion = '#quiz-single .content-quiz';
        let elmImageQuestion = '#quiz-single img';
        let elmOption = '.vn-box-answer .row > div';
        let elmCorrectAnswer = '.anwsers-correct span span';
        let elmSolution = '.content-solution .solution-item div';
        let elmImageSolution = '.content-solution .solution-item div img';
        let elmAnswer = '#quiz-solution .solution-item div';
        let elmImageAnswer = '#quiz-solution .solution-item div img';
        let elmNote = '.content-solution .note';

        let default_data = {
          'url_question': '',
          'category_id': '',
          'category_name': listCategory[number_subjects].name,
          'topic_id': '',
          'topic_name': topic_name,
          'topic_parent_name': topic_parent_name,
          'topic_parent_name_no_accents': removeAccents(topic_parent_name),
          'class_id': '',
          'class_name': class_name,
          'name': '',
          'tag': '',
          'content': '',
          'images': [],
          'option': [],
          'solution': '',
          'images_solution': [],
          'answer': '',
          'images_answer': [],
          'correct_answer': '',
          'note': ''
        };
        let temp_data = { ...default_data };

        await page.waitForTimeout(500).then(async () => {

          /**
           * GET Option
           */
          try {
            await page.waitForSelector(elmOption, { timeout: TIME_OUT_LONG }).then(async () => {
              temp_data.url_question = page.url();
              const option = await page.evaluate(async (elmOption) => {
                let elm = document.querySelectorAll(elmOption)
                elm = [...elm]
                let data = elm.map(item => ({
                  title: item.textContent.charAt(0),
                  content: item.textContent.slice(2),
                  image: item.querySelectorAll('img')[0] ? item.querySelectorAll('img')[0].getAttribute('src') : []
                }));
                return data;
              }, elmOption)
              temp_data.option = option;
            })

          } catch (error) {
            number_questions = number_questions + 1;
            sendTele(error, temp_data, 'GET Option', page.url());
            try {
              if (page.url() !== 'about:blank') {
                await page.goBack({ timeout: TIME_OUT_LONG })
              } else {
                await page.goto(listCategory[number_subjects].url)
              }
            } catch (error) {
              sendTele(error, [], 'ERROR GOBACK 342', page.url())
              try {
                await page.goto(listCategory[number_subjects].url)
              } catch (error) {
                try {
                  await page.reload({ timeout: TIME_OUT_LONG })
                } catch (error) {
                  sendTele(error, [], 'ERROR PAGE GOTO 350', page.url())
                }
              }
            }
          }
          /**
           * Get URL Question
           */
          try {
            await page.waitForSelector('#quiz-single', { timeout: TIME_OUT }).then(() => {
              temp_data.url_question = page.url();
            })
          } catch (error) { }

          /**
           * GET Name
           */
          try {
            await page.waitForSelector(elmName, { timeout: TIME_OUT }).then(async () => {
              temp_data.name = await page.$$eval(elmName, (elm) => elm[0].textContent);
            })
          } catch (error) { }

          /**
           * GET Tag
           */
          try {
            await page.waitForSelector(elmTag, { timeout: TIME_OUT }).then(async () => {
              temp_data.tag = await page.$$eval(elmTag, (elm) => elm[0].textContent);
            })
          } catch (error) { }

          /**
           * GET Question
           */
          try {
            await page.waitForSelector(elmQuestion, { timeout: TIME_OUT }).then(async () => {
              temp_data.content = await page.$$eval(elmQuestion, (elm) => elm[0].textContent);
            })
          } catch (error) { }

          /**
           * GET Image question
           */
          try {
            await page.waitForSelector(elmImageQuestion, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageQuestion) => {
                let elm = document.querySelectorAll(elmImageQuestion)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageQuestion)
              temp_data.images = images;
            })
          } catch (error) { }

          /**
           * GET Solution
           */
          try {
            await page.waitForSelector(elmSolution, { timeout: TIME_OUT }).then(async () => {
              temp_data.solution = await page.$$eval(elmSolution, (elm) => elm[0].textContent.replace('Xem chi tiết', '').replace('---', '').trim());
            })
          } catch (error) { }

          /**
           * GET Image Solution
           */
          try {
            await page.waitForSelector(elmImageSolution, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageSolution) => {
                let elm = document.querySelectorAll(elmImageSolution)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageSolution)
              temp_data.images_solution = images;
            })
          } catch (error) { }

          /**
           * GET Answer
           */
          try {
            await page.waitForSelector(elmAnswer, { timeout: TIME_OUT }).then(async () => {
              temp_data.answer = await page.$$eval(elmAnswer, (elm) => elm[0].textContent);
            })
          } catch (error) { }

          /**
           * GET Image answer
           */
          try {
            await page.waitForSelector(elmImageAnswer, { timeout: TIME_OUT }).then(async () => {
              const images = await page.evaluate(async (elmImageAnswer) => {
                let elm = document.querySelectorAll(elmImageAnswer)
                elm = [...elm]
                let data = elm.map(item => ({
                  src: item.getAttribute('src'),
                  title: item.getAttribute('title')
                }));
                return data;
              }, elmImageAnswer)
              temp_data.images_answer = images;
            })
          } catch (error) { }

          /**
           * GET Correct answer
           */
          try {
            await page.waitForSelector(elmCorrectAnswer, { timeout: TIME_OUT }).then(async () => {
              temp_data.correct_answer = await page.$$eval(elmCorrectAnswer, (elm) => elm[0].textContent);
            })
          } catch (error) { }

          /**
           * GET Note
           */
          try {
            await page.waitForSelector(elmNote, { timeout: TIME_OUT }).then(async () => {
              temp_data.note = await page.$$eval(elmNote, (elm) => elm[0].textContent);
            })
          } catch (error) { }
        })

        /**
         * push data
         */
        if (number_questions < limit_questions) {
          await saveData(temp_data);
          temp_data = { ...default_data };
          number_questions = number_questions + 1;
          total = total + 1;

          console.log("=================================");
          console.log("||          " + total + "       ||");
          console.log("=================================");

          try {
            await page.goBack({ timeout: TIME_OUT_LONG })
          } catch (error) {
            sendTele(error, [], 'ERROR GOBACK 342', page.url())
            try {
              await page.goto(listCategory[number_subjects].url)
            } catch (error) {
              try {
                await page.reload({ timeout: TIME_OUT_LONG })
              } catch (error) {
                sendTele(error, [], 'ERROR PAGE GOTO 350', page.url())
              }
            }
          }
        }

        /**
         * break questions
         */
        if (number_questions >= limit_questions) {
          number_topics = number_topics + 1;
          number_questions = 0;
          try {
            await page.goto(listCategory[number_subjects].url)
          } catch (error) {
            try {
              await page.reload({ timeout: TIME_OUT_LONG })
            } catch (error) {
              sendTele(error, [], 'ERROR GOBACK 377', page.url())
            }
          }
          console.log("**********  DONE 1 STEP TOPIC *********** \n");
          break;
        }
      }

      /**
       * break topic
       */
      if (number_topics >= limit_topics) {
        number_subjects = number_subjects + 1;
        number_topics = 0;
        console.log("**********  DONE 1 STEP SUBJECT *********** \n");
        try {
          await page.goto(listCategory[number_subjects].url);
        } catch (error) {
          try {
            await page.reload({ timeout: TIME_OUT_LONG })
          } catch (error) {
            sendTele(error, [], 'ERROR GOTO 398')
          }
        }
        break;
      }
    }

    /**
     * break subjects: Finish
     */
    if (number_subjects >= limit_subjects) {
      console.log("************* !!! FINISH ALL !!!! ************* \n");
      break;
    }
  }
  await browser.close();
})();


async function sendTele(error, data_tpm = [], note = '', url = '', line = 0) {
  let html = '';
  html += '<b>[Error] : </b><code>' + JSON.stringify(error) + '</code> \n';
  html += '<b>[Message] : </b><code>' + note + '</code> \n';
  html += '<b>[URL] : </b><code>' + url + '</code> \n';
  html += '<b>[Line] : </b><code>' + line + '</code> \n';
  html += '<b>[Data] : </b><code>' + JSON.stringify(data_tpm) + '</code> \n';

  try {
    await axios.post(process.env.TELE_URL, {
      chat_id: process.env.TELE_CHAT_ID,
      text: html,
    }).then(function (response) {
    });
  } catch (error) {
    console.log("LOCAL LOG: ERROR SEND TELEGRAM");
  }
}

async function saveData(data) {
  try {
    await axios.post(process.env.HOST_LOCAL, data)
      .then(function (response) {

      })
      .catch(function (error) {
        sendTele(error, data, 'Error Saved Database');
      });
  } catch (error) {
    console.log('LOCAL LOG: ERROR SAVE DATA');
  }
}

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str.trim().replace(/\s/g, '-').replaceAll(':', '').replaceAll(',', '').replaceAll('.', '').toLowerCase();
}
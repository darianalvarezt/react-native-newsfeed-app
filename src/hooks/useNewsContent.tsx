import axios from 'axios';
import {JSDOM} from 'jsdom';
import {Readability} from '@mozilla/readability';

import {IArticle} from '../interfaces';
import {useEffect, useState} from 'react';

export default (article: IArticle) => {
  const [content, setContent] = useState<string | undefined>();

  useEffect(() => {
    axios.get(article.url).then(function (response) {
      let dom = new JSDOM(response.data, {
        url: article.url,
      });

      let parsedArticle = new Readability(dom.window.document).parse();

      console.log({content: parsedArticle?.textContent});

      setContent(parsedArticle?.textContent);
    });
  }, [article]);

  return {content};
};

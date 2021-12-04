import * as React from 'react';

import Layout from '../components/Layout';
import SayHi from '../components/SayHi';

import { Heading1, Heading2, Paragraph } from '../components/Typography';
import List from '../components/List/List';

const Separator = function () {
  return <hr className="text-gray-200 border-2 my-8 w-8" />;
};

const AboutMe: React.FunctionComponent = function () {
  return (
    <Layout>
      <section className="max-w-screen-sm mt-5">
        <Heading1 key="heading1">/ˈdəgləs/</Heading1>
        <Paragraph key="paragraph1">
          我是 Douglas，一个目前工作与生活在杭州的 Web
          开发，虽然立足于前端岗位，但我的个人视野从不局限于前端，同样也会聚焦于后端
          / Devops / 抑或是产品 / UI。
        </Paragraph>
        <Paragraph key="paragraph2">
          开设这片自留地的主要原因在于，我希望在一个远离 gfw
          的地方描述与记录一些自己的个人想法，同时不必因为一些 ‘不可名状的原因’
          被迫自我阉割。因此，这里的记录可能并不仅限于开发，也可能会有一些除研发以外的随想。
        </Paragraph>
        <Paragraph key="paragraph3">
          最近执行 Lowcode 期间，对于业务本身的思考越来越多，因为 Blog
          中的大部分文章可能都在讲一些自己执行期间遇到的问题和思考，所以废话会多一点（对技术流来说）。
        </Paragraph>
        <Paragraph key="paragraph4">
          我一直坚信一点，分享知识是巩固 /
          获取新知识的最好方法。因此我会定期记录一些日常开发中解决问题的方法供各位参考。同样的，我热衷于为开源事业作出自己的一份贡献，如果有优质开源项目需要贡献人手，欢迎随时与我联系。
        </Paragraph>

        <section className="mt-40">
          <Heading2>个人准则</Heading2>
          <Paragraph>
            熟悉我的人都清楚，我拥有一套特殊的行事准则，这套准则本身极其理想化，代表着我个人行事所蕴含的信念（亦或者说是个人风格）。
          </Paragraph>
          <Paragraph>
            以下行为准则会随着时间变动而更新（绝不会做出任何删减）
          </Paragraph>
          <Separator />
          <Paragraph>
            1. Title
            的含金量由人来决定，而不是反过来（因为你牛逼，所以阿里工程师才牛逼，而不是因为阿里工程师牛逼，所以你牛逼）。
          </Paragraph>
          <Paragraph>
            2.
            行事的动力可以包含物质利益，但不能将其作为基础，这往往是最脆弱的支柱。
          </Paragraph>
          <Paragraph>
            3. 永远会存在比 KPI 更重要的事情，不要为了 KPI / Title
            去刻意的做某些事情。
          </Paragraph>
          <Paragraph>
            4. 事情成败，三分看人，七分看天，涉及物质利益的部分不能过于强求。
          </Paragraph>
          <Paragraph>
            5. 2b
            的市场中，用户的需求或许与其真实的诉求并不一致（一匹更快的马），深度发掘有时是必要的。
          </Paragraph>
          <Paragraph>
            6.
            妥协不意味着放弃，出现废案的可能性多种多样，保留它们，未来的某一天说不定会用上的。
          </Paragraph>
          <Paragraph>
            7.
            保持对成熟产品的敬畏之心（业内稳定存在五至十年以上），存在必合理，傲慢是生存最大的敌人。
          </Paragraph>
          <Paragraph>
            8.
            平等待人，永远谦卑。每个人都拥有其对应的潜力，发掘并合理引导它们，心态才是决定个人实力的最大因素。
          </Paragraph>
        </section>

        <section className="mt-40" key="section">
          <Heading2>当前阅读书单</Heading2>
          <Paragraph>
            计算机学科发展了这么多年，书籍与文档是用于记录知识的重要载体。这里会列出我最近正在读的一些书籍
            / 文章，作为个人记录使用。
          </Paragraph>
          <Paragraph>
            这份书单会以开发相关内容为主，同样会在一定时期加入一些非开发类别的书籍
            / 文章。
          </Paragraph>
          <Paragraph>
            我希望有朝一日，这份书单能发展成一份庞大的书籍记录，为后来的开发者提供一些有效的帮助，让他们能够少走一些我走过的弯路。
          </Paragraph>
          <section className="mt-12">
            <List title="2020 閱讀清單">
              <List.Item
                subtitle="Robert Sedgewick, Kevin Wayne"
                link="https://www.ituring.com.cn/book/875"
              >
              算法（第4版）
              </List.Item>
              <List.Item
                subtitle="高德纳"
                link="https://www.ituring.com.cn/book/925"
              >
              计算机程序设计艺术 卷4A：组合算法（一）
              </List.Item>
              <List.Item
                subtitle="Alexander Shvets"
                link="https://refactoringguru.cn/design-patterns/book"
              >
              深入设计模式
              </List.Item>
              <List.Item
                subtitle="Matt Frisbie"
                link="https://www.ituring.com.cn/book/2472"
              >
              JavaScript高级程序设计（第4版）
              </List.Item>
              <List.Item
                subtitle="Eric Matthes"
                link="https://www.ituring.com.cn/book/2784"
              >
              Python编程：从入门到实践（第2版）
              </List.Item>
            </List>
            <Separator />
            <List title="正在閱讀">
              <List.Item
                subtitle="Matt Frisbie"
                link="https://www.ituring.com.cn/book/2472"
              >
              JavaScript高级程序设计（第4版）
              </List.Item>
              <List.Item
                subtitle="Eric Matthes"
                link="https://www.ituring.com.cn/book/2784"
              >
              Python编程：从入门到实践（第2版）
              </List.Item>
            </List>
          </section>
        </section>
        <section className="my-11">
          <SayHi />
        </section>
      </section>
    </Layout>
  );
};

export default AboutMe;

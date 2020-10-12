/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// 百度统计
var React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    setHeadComponents([
      // 这里的形式是为了异步加载
      <script
        key="baidu-analytics-script"
        dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?28fe8d73f47b19d74e80749243c130dc";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        }}
      />
    ]);
  }
};

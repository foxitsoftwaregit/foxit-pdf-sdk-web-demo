declare var HTTP_BASE_URL: string; // base url of collab server http api, defined by build tool(webpack)
// declare var WS_BASE_URL: string; // base url of collab server websocket api, defined by build tool(webpack)
declare var APP: string;
declare var __webpack_public_path__: string;

function getConfig(){
  if(APP === 'dev'){
    return {
      serverUrl: HTTP_BASE_URL || `http://${window.location.hostname}:8080`
    }
  }else{
    // 部署到 azk8s 环境
    return {
      serverUrl: `https://${window.location.host}/collab-server`
    }
  }
}

const config = getConfig()
export const serverUrl = config.serverUrl;

export const PUBLIC_PATH = __webpack_public_path__;

export const licenseSN="rQibJXaLPO42DGeLXSkneuDcmcxcr9rYoRwNkksES1ZjZW8YQKY+Pw==";
export const licenseKey="PjwcmDRQMS6sbxteo9dUcH5sWhPDB2zsowJxXT/LWxbvvUIR+58OP352VA3GAiWNuKbvbYaBxLVjMmTUET5b+jkedyO+pEmxqN2YMeN6L9mLEN75CyiSnppWuSKQ84VjgpeA82upNf5YUBSbvRgH9alK3jfCI9+ElY78+p3poF732VxZE+x1FGNbz6eeMnaYRpSYHa19vFsA/tb4GMq9gEFG5KByT8ZFVZp0T9ZsNdrGN/uG+HJJgtn3LLk8bu9+KAwQLLXbJeBBnCc3tyOppXigLXUfwHl9u44jAZj/hG24Feqe8M5g3+GonVFwBMAgXZHQmiFSwqhoU9H57oOG21iWrNcBegXf+njH+lUEdpE4xIc31IaUZwlW4YLRU0eYWdhajAp+0Mh1SeMvR4X1WJ4vfJDo7X2BHQZCqWHF4FdiVvl6cpUrHUk1Vpz7BOa0Fwx79gydOIyoV1RYTj93d+jwEeym92W7iFfC0NzFEAqv0AmqZ0lIJlWB5geuuosRfQzkJ/O6O+7R1G4/CFGD5VyMrLKnyhK60DtFd//11vwGn+SHllUm8JrBGbWc2AQEuoeWBoKkCLBSb8JxOuMMcuFz0xjNDfkCAqwYnbHbYp9SfQfr41ycTddbvL2XfvETg/yu7ArzQl8h7PnMGKKqFPP6wGIloBYwWlx4ydC1f47VpwxkHoM2KoHgIbQoI7eS5cVYvPjQCZ//wCmEYaSDpGgI3b//jN/fW2d4LSYK4mOJteTykDuHU1k8KRxEA10E5KJ0L4nXYxcLLzechxHzcGJFjvCrUwuqfJGKWGfG+kbrZ46uwW7tDe3WEgy2eYHXx2VYs2vNmHLho7PCseXISjS9YC08z9y5nsYndpG3eL3fyDamUcxWvhVBeP+7KnwDH17IZDxTKB4eBJHl21upl2OS3KAAVvMtfSHsIn8OtlyZja/K2rz5CTBY1FCC1MF+qkUWwNW+zkuw23W78xpqciSSMUuUIZD1nUOaEJxqUcUvvCKttThiuUuCA3U9P2C0LP9OaAqsVa9MW7OHWZwycWvFcIyUFje9OdC4fscajk4lPDl6Hu5U+pnQwzXw0Y8iTIoVgrrpujKLNUyC06qyJYDeHNETVbK3xwASHx7LizJzjIq91DULnT+P3nnXqAtRPbtPPnO1j59JMJMOCPMAmPWqyb0PVfBIGrNwXwFRmnGEwQoddyhXjwJvGXhZDcy35AyEdg+S0i0hRcU9nSRZkL6+dvG+zkzKo2hb2IFWzjAm";

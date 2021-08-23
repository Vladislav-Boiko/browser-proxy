# Browser-proxy

Replace fetch, XMLHttpRequest, AJAX responses of any website on the fly without leaving the browser!

Table of contents:

- [Quick start](#Quick-start)
- [Overriding responses](#Overriding-responses)
  - [Overriding an existing request](#Overriding-an-existing-request)
  - [Creating a new Override](#Creating-a-new-Override)

## 🚀 Quick start

First let us activate the extension on your desired web page:

1. Install the browser-proxy chrome extension from chrome web-store. (for [manual extension installation check this section](#Manual-extension-installation))
2. Go to a web page where you want to override a response.
3. Click on the browser-proxy-chrome extension icon in the browser upper right corner:

   \
    ![Extension icon](/docs/img/extension_icon.png)

4. Click on the Enable button:

   \
   ![Enable extension](/docs/img/enable_extension.png)

5. Reload the page. The extension icon shall now be blue, indicating it is enabled on this page:

   \
    ![Enable extension](/docs/img/extension_enabled_icon.png)

🥳 You are all set, if the icon of the extension is blue, it is active on this web page. You can always turn it off for a certain page, buy toggling the "disable" toggle in it.

\
![Disable extension](/docs/img/disable_extension.png)

## Overriding responses

You can either change a response of an existing request, or mock a completely new one.
First open the the extension on the desired site ([how?](#Quick-start))

> 💡 **Hint** \
> Instead of always opening browser-proxy through the extension icon, you can open it in the developer tools. To open it open the Chrome Menu in the upper-right-hand corner of the browser window and select More Tools > Developer Tools, or use Option + ⌘ + J (on macOS), or Shift + CTRL + J (on Windows/Linux). There you shall be a tab 'browser-proxy', where you can access the extension.
>
> ![Extension in dev-tools](/docs/img/dev_tools.png)

### Overriding an existing request

For example we will override an item in the user-menu on github. It is loaded via fetch, when one hovers with mouse own avatar on github in the top right of the screen.

<table border="0">
 <tr>
    <td><b>We will change this</b></td>
    <td><b>To this</b></td>
 </tr>
 <tr>
    <td><img alt="Github menu" src="./docs/img/github_menu.png" height="450px"/></td>
    <td><img alt="Github menu overriden" src="./docs/img/gihub_menu_overriden.png" height="450px"/></td>
 </tr>
</table>

1. Choose the request you want, from the list of requests that were captured by the extension. Note, that static assets such as images or css files are not monitored by the extension.

   \
    ![Choosing request](/docs/img/choosing_request.png)

2. Click on the `Override` Button.

   \
    ![Override](/docs/img/override.png)

3. The response tab of a request shall open, and there you can see the response for the fetch that loaded the menu:

   \
    ![Override](/docs/img/response_tab.png)

4. Modify the response to have something new it in. Here we change the "Sign out" text, to a "Hello World from Browser-Proxy!" text.

<table border="0" style="position: relative">
 <tr>
    <td><b>We will change this</b></td>
    <td><b>To this</b></td>
 </tr>
 <tr>
    <td><img alt="Change response 1" src="./docs/img/change_response1.png"/></td>
    <td><img alt="Change response 2" src="./docs/img/change_response2.png"/></td>
 </tr>
</table>

5. Click save.

   \
    ![Save](/docs/img/save.png)

6. Resend the request to get the new response. In our case we have to reload the page and to click the avatar once again:
   \
   <img alt="Github menu overriden" src="./docs/img/gihub_menu_overriden.png" height="450px"/>

### Creating a new Override

#### **Matching the request to be overriden**

1. Go to a website where you want to create an override.
2. Click `add override`

   \
    ![Add override](/docs/img/add_override.png)

3. Go to request tab of the created override

   \
    ![Request tab](/docs/img/request_tab.png)

4. There give in the URL of a request you want to override:

   \
    ![Url](/docs/img/url.png)

5. If you are sending some request body specify it in the request body section:

   \
    ![Request body](/docs/img/request_body.png)

6. If you are setting some request headers, also specify them in the Request headers section:

   \
    ![Request headers](/docs/img/request_headers.png)

> 💡 **Hint** \
> If you want some generic matching of the request parameters, in URL, body or headers you can use RegEp based variables mechanism that is described [in the next section](#Using-variables-for-RegExp-matching).

#### **Changing the response of a request**

1. Go to the response tab:

   \
    ![Response tab](/docs/img/response_tab.png)

2. Modify the response you wat to get:

   \
    ![Response text body](/docs/img/response_text_body.png)

3. You can also change the response code and the delay after which the response will be returned:

   \
    ![Response code and delay](/docs/img/response_code_and_delay.png)

4. If you want to return a file, choose the file return type, and either upload a file, or type in its bytes as a base64 encoded string.

   \
    ![File response](/docs/img/file_response.png)

5. You can also add chunks to response body with separate delays. Then the overriden request will receive the response sequentially in this chunks. You can also join all chunks into one response.

   \
    ![Adding chunk](/docs/img/add_chunk.png)

6. Define the response headers you want to receive:

   \
    ![Response headers](/docs/img/response_headers.png)

> 💡 **Hint** \
> If you want to use some part of a request as part of the response you can use the variable mechanism, to capture what use sent, and use it in the response. It can as well be use in the response body as well as in the response headers. See usage of variables [in the next section](#Using-variables-for-RegExp-matching).

## Using variables for RegExp matching

## Import/Export and sharing overrides

## Troubleshooting

## Manual extension installation

# Browser-proxy

Replace fetch, XMLHttpRequest, AJAX responses of any website on the fly without leaving the browser!

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

> Hint:
> Instead of always opening browser-proxy through the extension icon, you can open it in the developer tools. To open it open the Chrome Menu in the upper-right-hand corner of the browser window and select More Tools > Developer Tools, or use Option + ⌘ + J (on macOS), or Shift + CTRL + J (on Windows/Linux). There you shall be a tab 'browser-proxy', where you can access the extension.
>
> ![Extension in dev-tools](/docs/img/dev_tools.png)

### Overriding an existing request:

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

### Creating a new Override:

1. Choose the site on which you want to do the override.
2. Click `add override`
3. In the response

## Using Rules and RegExp to match requests

## Import/Export and sharing overrides

## Troubleshooting

## Manual extension installation

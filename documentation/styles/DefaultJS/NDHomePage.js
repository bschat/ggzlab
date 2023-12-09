﻿/*
This file is part of Natural Docs, which is Copyright © 2003-2023 Code Clear LLC.
Natural Docs is licensed under version 3 of the GNU Affero General Public
License (AGPL).  Refer to License.txt or www.naturaldocs.org for the
complete details.

This file may be distributed with documentation files generated by Natural Docs.
Such documentation is not covered by Natural Docs' copyright and licensing,
and may have its own copyright and distribution terms as decided by its author.
*/

"use strict";var NDHomePage=new function(){this.Start=function(){this.messageEventHandler=NDHomePage.OnMessage.bind(NDHomePage);this.effectiveThemeChangeEventHandler=NDHomePage.OnEffectiveThemeChange.bind(NDHomePage);var themeID=NDCore.GetQueryParam('Theme');NDThemes.SetCurrentTheme(themeID,false);document.addEventListener("NDEffectiveThemeChange",this.effectiveThemeChangeEventHandler);window.addEventListener("message",this.messageEventHandler);};this.OnMessage=function(event){var message=event.data;if(message=="NoTheme"){NDThemes.SetCurrentTheme(undefined,false);}else if(message.startsWith("Theme=")){var theme=message.slice(6);NDThemes.SetCurrentTheme(theme,false);}};this.OnEffectiveThemeChange=function(event){if(event.detail.oldEffectiveThemeID!=undefined){document.documentElement.classList.remove(event.detail.oldEffectiveThemeID+"Theme");}if(event.detail.newEffectiveThemeID!=undefined){document.documentElement.classList.add(event.detail.newEffectiveThemeID+"Theme");}};};
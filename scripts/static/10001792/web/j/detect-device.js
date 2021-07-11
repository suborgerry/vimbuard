var detect=avm.require("avast.detect"),detecting=detect();detecting.os.isAndroid?$("body").addClass("detect-mobile"):$("body").addClass("detect-desktop");

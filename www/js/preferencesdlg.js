//Preferences dialog
var preferenceslist = [];
var language_save = language;
var default_preferenceslist = [];
var defaultpreferenceslist = "[{\
                                            \"language\":\"en\",\
                                            \"enable_lock_UI\":\"false\",\
                                            \"enable_ping\":\"true\",\
                                            \"enable_camera\":\"false\",\
                                            \"auto_load_camera\":\"false\",\
                                            \"camera_address\":\"\",\
                                            \"enable_redundant\":\"false\",\
                                            \"enable_fan\":\"false\",\
                                            \"enable_control_panel\":\"true\",\
                                            \"enable_grbl_panel\":\"false\",\
                                            \"interval_positions\":\"3\",\
                                            \"interval_status\":\"3\",\
                                            \"xy_feedrate\":\"1000\",\
                                            \"z_feedrate\":\"100\",\
                                            \"f_filters\":\"gco;gcode\",\
                                            \"enable_files_panel\":\"true\",\
                                            \"has_TFT_SD\":\"false\",\
                                            \"has_TFT_USB\":\"false\",\
                                            \"enable_commands_panel\":\"true\",\
                                            \"enable_autoscroll\":\"true\",\
                                            \"enable_verbose_mode\":\"true\",\
                                            \"enable_grbl_probe_panel\":\"false\",\
                                            \"enable_grbl_surface_panel\":\"false\",\
                                            \"probemaxtravel\":\"40\",\
                                            \"probefeedrate\":\"100\",\
                                            \"probetouchplatethickness\":\"0.5\",\
                                            \"surfacewidth\":\"100\",\
                                            \"surfacelength\":\"400\",\
                                            \"surfacezdepth\":\"0\",\
                                            \"surfacebitdiam\":\"12.7\",\
                                            \"surfacestepover\":\"40\",\
                                            \"surfacefeedrate\":\"1000\",\
                                            \"surfacespindle\":\"10000\"\
                                            }]";
var preferences_file_name = '/preferences.json';

function initpreferences() {

    defaultpreferenceslist = "[{\
                                            \"language\":\"en\",\
                                            \"enable_lock_UI\":\"false\",\
                                            \"enable_ping\":\"true\",\
                                            \"enable_camera\":\"false\",\
                                            \"auto_load_camera\":\"false\",\
                                            \"camera_address\":\"\",\
                                            \"enable_redundant\":\"false\",\
                                            \"enable_probe\":\"false\",\
                                            \"enable_fan\":\"false\",\
                                            \"enable_control_panel\":\"true\",\
                                            \"enable_grbl_panel\":\"true\",\
                                            \"interval_positions\":\"3\",\
                                            \"interval_status\":\"3\",\
                                            \"xy_feedrate\":\"1000\",\
                                            \"z_feedrate\":\"100\",\
                                            \"enable_files_panel\":\"true\",\
                                            \"has_TFT_SD\":\"false\",\
                                            \"has_TFT_USB\":\"false\",\
                                            \"f_filters\":\"g;G;gco;GCO;gcode;GCODE;nc;NC;ngc;NCG;tap;TAP;txt;TXT\",\
                                            \"enable_commands_panel\":\"true\",\
                                            \"enable_autoscroll\":\"true\",\
                                            \"enable_verbose_mode\":\"true\",\
                                            \"enable_grbl_probe_panel\":\"false\",\
                                            \"enable_grbl_surface_panel\":\"false\",\
                                            \"probemaxtravel\":\"40\",\
                                            \"probefeedrate\":\"100\",\
                                            \"probetouchplatethickness\":\"0.5\",\
                                            \"surfacewidth\":\"100\",\
                                            \"surfacelength\":\"400\",\
                                            \"surfacezdepth\":\"0\",\
                                            \"surfacebitdiam\":\"12.7\",\
                                            \"surfacestepover\":\"40\",\
                                            \"surfacefeedrate\":\"1000\",\
                                            \"surfacespindle\":\"10000\"\
                                            }]";

    document.getElementById('temp_pref_panel').style.display = 'none';
    document.getElementById('ext_pref_panel').style.display = 'none';
    document.getElementById('grbl_pref_panel').style.display = 'block';
    document.getElementById('has_tft_sd').style.display = 'table-row';
    document.getElementById('has_tft_usb').style.display = 'table-row';


    document.getElementById('redundant_controls_option').style.display = 'none';
    document.getElementById('probe_controls_option').style.display = 'none';
    document.getElementById('chamber_controls_option').style.display = 'none';

    default_preferenceslist = JSON.parse(defaultpreferenceslist);
}

function getpreferenceslist() {
    var url = preferences_file_name + "?" + Date.now();
    preferenceslist = [];
    //removeIf(production)
    var response = defaultpreferenceslist;
    processPreferencesGetSuccess(response);
    return;
    //endRemoveIf(production)
    SendGetHttp(url, processPreferencesGetSuccess, processPreferencesGetFailed);
}

function prefs_toggledisplay(id_source, forcevalue) {
    if (typeof forcevalue != 'undefined') {
        document.getElementById(id_source).checked = forcevalue;
    }
    switch (id_source) {
        case 'show_files_panel':
            if (document.getElementById(id_source).checked) document.getElementById("files_preferences").style.display = "block";
            else document.getElementById("files_preferences").style.display = "none";
            break;
        case 'show_grbl_panel':
            if (document.getElementById(id_source).checked) document.getElementById("grbl_preferences").style.display = "block";
            else document.getElementById("grbl_preferences").style.display = "none";
            break;
        case 'show_camera_panel':
            if (document.getElementById(id_source).checked) document.getElementById("camera_preferences").style.display = "block";
            else document.getElementById("camera_preferences").style.display = "none";
            break;
        case 'show_control_panel':
            if (document.getElementById(id_source).checked) document.getElementById("control_preferences").style.display = "block";
            else document.getElementById("control_preferences").style.display = "none";
            break;
        case 'show_extruder_panel':
            if (document.getElementById(id_source).checked) document.getElementById("extruder_preferences").style.display = "block";
            else document.getElementById("extruder_preferences").style.display = "none";
            break;
        case 'show_temperatures_panel':
            if (document.getElementById(id_source).checked) document.getElementById("temperatures_preferences").style.display = "block";
            else document.getElementById("temperatures_preferences").style.display = "none";
            break;
        case 'show_commands_panel':
            if (document.getElementById(id_source).checked) document.getElementById("cmd_preferences").style.display = "block";
            else document.getElementById("cmd_preferences").style.display = "none";
            break;
        case 'show_grbl_probe_tab':
            if (document.getElementById(id_source).checked) document.getElementById("grbl_probe_preferences").style.display = "block";
            else document.getElementById("grbl_probe_preferences").style.display = "none";
            break;
        case 'show_grbl_surface_tab':
            {
                if (document.getElementById(id_source).checked) document.getElementById("grbl_surface_preferences").style.display = "block";
                else document.getElementById("grbl_surface_preferences").style.display = "none";
                break;
            }
    }
}

function processPreferencesGetSuccess(response) {
    if (response.indexOf("<HTML>") == -1) Preferences_build_list(response);
    else Preferences_build_list(defaultpreferenceslist);
}

function processPreferencesGetFailed(errorcode, response) {
    console.log("Error " + errorcode + " : " + response);
    Preferences_build_list(defaultpreferenceslist);
}

function Preferences_build_list(response_text) {
    preferenceslist = [];
    try {
        if (response_text.length != 0) {
            //console.log(response_text);  
            preferenceslist = JSON.parse(response_text);
        } else {
            preferenceslist = JSON.parse(defaultpreferenceslist);
        }
    } catch (e) {
        console.error("Parsing error:", e);
        preferenceslist = JSON.parse(defaultpreferenceslist);
    }
    applypreferenceslist();
}

function applypreferenceslist() {
    //Assign each control state
    translate_text(preferenceslist[0].language);
    build_HTML_setting_list(current_setting_filter);
    if (typeof document.getElementById('camtab') != "undefined") {
        var camoutput = false;
        if (typeof (preferenceslist[0].enable_camera) !== 'undefined') {
            if (preferenceslist[0].enable_camera === 'true') {
                document.getElementById('camtablink').style.display = "block";
                camera_GetAddress();
                if (typeof (preferenceslist[0].auto_load_camera) !== 'undefined') {
                    if (preferenceslist[0].auto_load_camera === 'true') {
                        var saddress = document.getElementById('camera_webaddress').value
                        camera_loadframe();
                        camoutput = true;
                    }
                }
            } else {
                document.getElementById("maintablink").click();
                document.getElementById('camtablink').style.display = "none";
            }
        } else {
            document.getElementById("maintablink").click();
            document.getElementById('camtablink').style.display = "none";
        }
        if (!camoutput) {
            document.getElementById('camera_frame').src = "";
            document.getElementById('camera_frame_display').style.display = "none";
            document.getElementById('camera_detach_button').style.display = "none";
        }
    }
    if (preferenceslist[0].enable_grbl_probe_panel === 'true') {
        document.getElementById('grblprobetablink').style.display = 'block';
    } else {
        document.getElementById("grblcontroltablink").click();
        document.getElementById('grblprobetablink').style.display = 'none';
    }
    if (preferenceslist[0].enable_grbl_surface_panel === 'true') {
        document.getElementById('grblsurfacetablink').style.display = 'block';
    } else {
        document.getElementById('grblsurfacetablink').style.display = 'none';
    }

    if (preferenceslist[0].enable_lock_UI === 'true') {
        document.getElementById('lock_ui_btn').style.display = 'block';
        ontoggleLock(true);
    } else {
        document.getElementById('lock_ui_btn').style.display = 'none';
        ontoggleLock(false);
    }
    if (preferenceslist[0].enable_ping === 'true') {
        ontogglePing(true);
    } else {
        ontogglePing(false);
    }

    if (preferenceslist[0].enable_grbl_panel === 'true') document.getElementById('grblPanel').style.display = 'flex';
    else {
        document.getElementById('grblPanel').style.display = 'none';
        on_autocheck_status(false);
    }

    if (preferenceslist[0].enable_control_panel === 'true') document.getElementById('controlPanel').style.display = 'flex';
    else {
        document.getElementById('controlPanel').style.display = 'none';
        on_autocheck_position(false);
    }
    if (preferenceslist[0].enable_verbose_mode === 'true') {
        document.getElementById('monitor_enable_verbose_mode').checked = true;
        Monitor_check_verbose_mode();
    } else document.getElementById('monitor_enable_verbose_mode').checked = false;

    if (preferenceslist[0].enable_files_panel === 'true') document.getElementById('filesPanel').style.display = 'flex';
    else document.getElementById('filesPanel').style.display = 'none';

    if (preferenceslist[0].has_TFT_SD === 'true') {
        document.getElementById('files_refresh_tft_sd_btn').style.display = 'flex';
    }
    else {
        document.getElementById('files_refresh_tft_sd_btn').style.display = 'none';
    }

    if (preferenceslist[0].has_TFT_USB === 'true') {
        document.getElementById('files_refresh_tft_usb_btn').style.display = 'flex';
    }
    else {
        document.getElementById('files_refresh_tft_usb_btn').style.display = 'none';
    }

    if ((preferenceslist[0].has_TFT_SD === 'true') || (preferenceslist[0].has_TFT_USB === 'true')) {
        document.getElementById('files_refresh_printer_sd_btn').style.display = 'flex';
        document.getElementById('files_refresh_btn').style.display = 'none';
    } else {
        document.getElementById('files_refresh_printer_sd_btn').style.display = 'none';
        document.getElementById('files_refresh_btn').style.display = 'flex';
    }

    document.getElementById('files_refresh_printer_sd_btn').style.display = 'none';
    document.getElementById('files_refresh_btn').style.display = 'none';
    document.getElementById('print_upload_btn').style.display = 'none';
    document.getElementById('files_createdir_btn').style.display = "none";

    if (preferenceslist[0].enable_commands_panel === 'true') {
        document.getElementById('commandsPanel').style.display = 'flex';
        if (preferenceslist[0].enable_autoscroll === 'true') {
            document.getElementById('monitor_enable_autoscroll').checked = true;
            Monitor_check_autoscroll();
        } else document.getElementById('monitor_enable_autoscroll').checked = false;
    } else document.getElementById('commandsPanel').style.display = 'none';

    document.getElementById('posInterval_check').value = parseInt(preferenceslist[0].interval_positions);
    document.getElementById('statusInterval_check').value = parseInt(preferenceslist[0].interval_status);
    document.getElementById('control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
    document.getElementById('control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);
    document.getElementById('probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
    document.getElementById('probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
    document.getElementById('probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
    document.getElementById('surfacewidth').value = parseFloat(preferenceslist[0].surfacewidth);
    document.getElementById('surfacelength').value = parseFloat(preferenceslist[0].surfacelength);
    document.getElementById('surfacezdepth').value = parseFloat(preferenceslist[0].surfacezdepth);
    document.getElementById('surfacestepover').value = parseInt(preferenceslist[0].surfacestepover);
    document.getElementById('surfacespindle').value = parseInt(preferenceslist[0].surfacespindle);
    document.getElementById('surfacefeedrate').value = parseInt(preferenceslist[0].surfacefeedrate);
    document.getElementById('surfacebitdiam').value = parseFloat(preferenceslist[0].surfacebitdiam);
    build_file_filter_list(preferenceslist[0].f_filters);
}

function showpreferencesdlg() {
    var modal = setactiveModal('preferencesdlg.html');
    if (modal == null) return;
    language_save = language;
    build_dlg_preferences_list();
    document.getElementById('preferencesdlg_upload_msg').style.display = 'none';
    showModal();
}

function build_dlg_preferences_list() {
    //use preferenceslist to set dlg status
    var content = "<table><tr><td>";
    content += get_icon_svg("flag") + "&nbsp;</td><td>";
    content += build_language_list("language_preferences");
    content += "</td></tr></table>";
    document.getElementById("preferences_langage_list").innerHTML = content;
    //camera
    if (typeof (preferenceslist[0].enable_camera) !== 'undefined') {
        document.getElementById('show_camera_panel').checked = (preferenceslist[0].enable_camera === 'true');
    } else document.getElementById('show_camera_panel').checked = false;
    //autoload camera
    if (typeof (preferenceslist[0].auto_load_camera) !== 'undefined') {
        document.getElementById('autoload_camera_panel').checked = (preferenceslist[0].auto_load_camera === 'true');
    } else document.getElementById('autoload_camera_panel').checked = false;
    //camera address
    if (typeof (preferenceslist[0].camera_address) !== 'undefined') {
        document.getElementById('preferences_camera_webaddress').value = decode_entitie(preferenceslist[0].camera_address);
    } else document.getElementById('preferences_camera_webaddress').value = "";
    //lock UI
    if (typeof (preferenceslist[0].enable_lock_UI) !== 'undefined') {
        document.getElementById('enable_lock_UI').checked = (preferenceslist[0].enable_lock_UI === 'true');
    } else document.getElementById('enable_lock_UI').checked = false;
    //Monitor connection
    if (typeof (preferenceslist[0].enable_ping) !== 'undefined') {
        document.getElementById('enable_ping').checked = (preferenceslist[0].enable_ping === 'true');
    } else document.getElementById('enable_ping').checked = false;
    //probe
    if (typeof (preferenceslist[0].enable_probe) !== 'undefined') {
        document.getElementById('enable_probe_controls').checked = (preferenceslist[0].enable_probe === 'true');
    } else document.getElementById('enable_probe_controls').checked = false;
    //fan
    if (typeof (preferenceslist[0].enable_fan) !== 'undefined') {
        document.getElementById('enable_fan_controls').checked = (preferenceslist[0].enable_fan === 'true');
    } else document.getElementById('enable_fan_controls').checked = false;
    //grbl panel
    if (typeof (preferenceslist[0].enable_grbl_panel) !== 'undefined') {
        document.getElementById('show_grbl_panel').checked = (preferenceslist[0].enable_grbl_panel === 'true');
    } else document.getElementById('show_grbl_panel').checked = false;
    //grbl probe panel
    if (typeof (preferenceslist[0].enable_grbl_probe_panel) !== 'undefined') {
        document.getElementById('show_grbl_probe_tab').checked = (preferenceslist[0].enable_grbl_probe_panel === 'true');
    } else document.getElementById('show_grbl_probe_tab').checked = false;
    //grbl surface panel
    if (typeof (preferenceslist[0].enable_grbl_surface_panel) !== 'undefined') {
        document.getElementById('show_grbl_surface_tab').checked = (preferenceslist[0].enable_grbl_surface_panel === 'true');
    } else document.getElementById('show_grbl_surface_tab').checked = false;
    //control panel
    if (typeof (preferenceslist[0].enable_control_panel) !== 'undefined') {
        document.getElementById('show_control_panel').checked = (preferenceslist[0].enable_control_panel === 'true');
    } else document.getElementById('show_control_panel').checked = false;
    //files panel
    if (typeof (preferenceslist[0].enable_files_panel) !== 'undefined') {
        document.getElementById('show_files_panel').checked = (preferenceslist[0].enable_files_panel === 'true');
    } else document.getElementById('show_files_panel').checked = false;
    //TFT SD
    if (typeof (preferenceslist[0].has_TFT_SD) !== 'undefined') {
        document.getElementById('has_tft_sd').checked = (preferenceslist[0].has_TFT_SD === 'true');
    } else document.getElementById('has_tft_sd').checked = false;
    //TFT USB
    if (typeof (preferenceslist[0].has_TFT_USB) !== 'undefined') {
        document.getElementById('has_tft_usb').checked = (preferenceslist[0].has_TFT_USB === 'true');
    } else document.getElementById('has_tft_usb').checked = false;
    //commands
    if (typeof (preferenceslist[0].enable_commands_panel) !== 'undefined') {
        document.getElementById('show_commands_panel').checked = (preferenceslist[0].enable_commands_panel === 'true');
    } else document.getElementById('show_commands_panel').checked = false;
    //interval positions
    if (typeof (preferenceslist[0].interval_positions) !== 'undefined') {
        document.getElementById('preferences_pos_Interval_check').value = parseInt(preferenceslist[0].interval_positions);
    } else document.getElementById('preferences_pos_Interval_check').value = parseInt(default_preferenceslist[0].interval_positions);
    //interval status
    if (typeof (preferenceslist[0].interval_status) !== 'undefined') {
        document.getElementById('preferences_status_Interval_check').value = parseInt(preferenceslist[0].interval_status);
    } else document.getElementById('preferences_status_Interval_check').value = parseInt(default_preferenceslist[0].interval_status);
    //xy feedrate
    if (typeof (preferenceslist[0].xy_feedrate) !== 'undefined') {
        document.getElementById('preferences_control_xy_velocity').value = parseInt(preferenceslist[0].xy_feedrate);
    } else document.getElementById('preferences_control_xy_velocity').value = parseInt(default_preferenceslist[0].xy_feedrate);
    if ((grblaxis > 2)) {
        //z feedrate
        if (typeof (preferenceslist[0].z_feedrate) !== 'undefined') {
            document.getElementById('preferences_control_z_velocity').value = parseInt(preferenceslist[0].z_feedrate);
        } else document.getElementById('preferences_control_z_velocity').value = parseInt(default_preferenceslist[0].z_feedrate);
    }
    //probemaxtravel
    if ((typeof (preferenceslist[0].probemaxtravel) !== 'undefined') && (preferenceslist[0].probemaxtravel.length != 0)) {
        document.getElementById('preferences_probemaxtravel').value = parseFloat(preferenceslist[0].probemaxtravel);
    } else {
        document.getElementById('preferences_probemaxtravel').value = parseFloat(default_preferenceslist[0].probemaxtravel);
    }
    //probefeedrate
    if ((typeof (preferenceslist[0].probefeedrate) !== 'undefined') && (preferenceslist[0].probefeedrate.length != 0)) {
        document.getElementById('preferences_probefeedrate').value = parseInt(preferenceslist[0].probefeedrate);
    } else document.getElementById('preferences_probefeedrate').value = parseInt(default_preferenceslist[0].probefeedrate);
    //probetouchplatethickness
    if ((typeof (preferenceslist[0].probetouchplatethickness) !== 'undefined') && (preferenceslist[0].probetouchplatethickness.length != 0)) {
        document.getElementById('preferences_probetouchplatethickness').value = parseFloat(preferenceslist[0].probetouchplatethickness);
    } else document.getElementById('preferences_probetouchplatethickness').value = parseFloat(default_preferenceslist[0].probetouchplatethickness);
    //surfacewidth
    if ((typeof (preferenceslist[0].surfacewidth) !== 'undefined') && (preferenceslist[0].surfacewidth.length != 0)) {
        document.getElementById('preferences_surfacewidth').value = parseFloat(preferenceslist[0].surfacewidth);
    } else {
        document.getElementById('preferences_surfacewidth').value = parseFloat(default_preferenceslist[0].surfacewidth);
    }
    //surfacelength
    if ((typeof (preferenceslist[0].surfacelength) !== 'undefined') && (preferenceslist[0].surfacelength.length != 0)) {
        document.getElementById('preferences_surfacelength').value = parseFloat(preferenceslist[0].surfacelength);
    } else {
        document.getElementById('preferences_surfacelength').value = parseFloat(default_preferenceslist[0].surfacelength);
    }
    //surfacezdepth
    if ((typeof (preferenceslist[0].surfacezdepth) !== 'undefined') && (preferenceslist[0].surfacezdepth.length != 0)) {
        document.getElementById('preferences_surfacezdepth').value = parseFloat(preferenceslist[0].surfacezdepth);
    } else {
        document.getElementById('preferences_surfacezdepth').value = parseFloat(default_preferenceslist[0].surfacezdepth);
    }
    //surfacebitdiam
    if ((typeof (preferenceslist[0].surfacebitdiam) !== 'undefined') && (preferenceslist[0].surfacebitdiam.length != 0)) {
        document.getElementById('preferences_surfacebitdiam').value = parseFloat(preferenceslist[0].surfacebitdiam);
    } else document.getElementById('preferences_surfacebitdiam').value = parseFloat(default_preferenceslist[0].surfacebitdiam);
    //surfacespindle
    if ((typeof (preferenceslist[0].surfacespindle) !== 'undefined') && (preferenceslist[0].surfacespindle.length != 0)) {
        document.getElementById('preferences_surfacespindle').value = parseInt(preferenceslist[0].surfacespindle);
    } else {
        document.getElementById('preferences_surfacespindle').value = parseInt(default_preferenceslist[0].surfacespindle);
    }
    //surfacestepover
    if ((typeof (preferenceslist[0].surfacestepover) !== 'undefined') && (preferenceslist[0].surfacestepover.length != 0)) {
        document.getElementById('preferences_surfacestepover').value = parseInt(preferenceslist[0].surfacestepover);
    } else {
        document.getElementById('preferences_surfacestepover').value = parseInt(default_preferenceslist[0].surfacestepover);
    }
    //surfacefeedrate
    if ((typeof (preferenceslist[0].surfacefeedrate) !== 'undefined') && (preferenceslist[0].surfacefeedrate.length != 0)) {
        document.getElementById('preferences_surfacefeedrate').value = parseInt(preferenceslist[0].surfacefeedrate);
    } else {
        document.getElementById('preferences_surfacefeedrate').value = parseInt(default_preferenceslist[0].surfacefeedrate);
    }
    //autoscroll
    if (typeof (preferenceslist[0].enable_autoscroll) !== 'undefined') {
        document.getElementById('preferences_autoscroll').checked = (preferenceslist[0].enable_autoscroll === 'true');
    } else document.getElementById('preferences_autoscroll').checked = false;
    //Verbose Mode
    if (typeof (preferenceslist[0].enable_verbose_mode) !== 'undefined') {
        document.getElementById('preferences_verbose_mode').checked = (preferenceslist[0].enable_verbose_mode === 'true');
    } else document.getElementById('preferences_verbose_mode').checked = false;
    //file filters
    if (typeof (preferenceslist[0].f_filters) != 'undefined') {
        console.log("Use prefs filters");
        document.getElementById('preferences_filters').value = preferenceslist[0].f_filters;
    } else {
        console.log("Use default filters");
        document.getElementById('preferences_filters').value = String(default_preferenceslist[0].f_filters);
    }

    prefs_toggledisplay('show_camera_panel');
    prefs_toggledisplay('show_grbl_panel');
    prefs_toggledisplay('show_control_panel');
    prefs_toggledisplay('show_extruder_panel');
    prefs_toggledisplay('show_temperatures_panel');
    prefs_toggledisplay('show_commands_panel');
    prefs_toggledisplay('show_files_panel');
    prefs_toggledisplay('show_grbl_probe_tab');
    prefs_toggledisplay('show_grbl_surface_tab');
}

function closePreferencesDialog() {
    var modified = false;
    if (preferenceslist[0].length != 0) {
        //check dialog compare to global state
        let modified = false;
        for (let p in preferenceslist[0]) {
            if ((typeof p) === 'undefined') {
                modified = true;
            }
        }
        if (!modified) {
            //camera
            if (document.getElementById('show_camera_panel').checked != (preferenceslist[0].enable_camera === 'true')) modified = true;
            //Autoload
            if (document.getElementById('autoload_camera_panel').checked != (preferenceslist[0].auto_load_camera === 'true')) modified = true;
            //camera address
            if (document.getElementById('preferences_camera_webaddress').value != decode_entitie(preferenceslist[0].camera_address)) modified = true;
            //Lock UI
            if (document.getElementById('enable_lock_UI').checked != (preferenceslist[0].enable_lock_UI === 'true')) modified = true;
            //Monitor connection
            if (document.getElementById('enable_ping').checked != (preferenceslist[0].enable_ping === 'true')) modified = true;
            //probe
            if (document.getElementById('enable_probe_controls').checked != (preferenceslist[0].enable_probe === 'true')) modified = true;
            //fan.
            if (document.getElementById('enable_fan_controls').checked != (preferenceslist[0].enable_fan === 'true')) modified = true;
            //control panel
            if (document.getElementById('show_control_panel').checked != (preferenceslist[0].enable_control_panel === 'true')) modified = true;
            //temperatures panel
            if (document.getElementById('show_temperatures_panel').checked != (preferenceslist[0].enable_temperatures_panel === 'true')) modified = true;
            //grbl panel
            if (document.getElementById('show_grbl_panel').checked != (preferenceslist[0].enable_grbl_panel === 'true')) modified = true;
            //grbl probe panel
            if (document.getElementById('show_grbl_probe_tab').checked != (preferenceslist[0].enable_grbl_probe_panel === 'true')) modified = true;
            //grbl surface panel
            if (document.getElementById('show_grbl_surface_tab').checked != (preferenceslist[0].enable_grbl_surface_panel === 'true')) modified = true;
            //files panel
            if (document.getElementById('show_files_panel').checked != (preferenceslist[0].enable_files_panel === 'true')) modified = true;
            //TFT SD
            if (document.getElementById('has_tft_sd').checked != (preferenceslist[0].has_TFT_SD === 'true')) modified = true;
            //TFT USB
            if (document.getElementById('has_tft_usb').checked != (preferenceslist[0].has_TFT_USB === 'true')) modified = true;
            //commands
            if (document.getElementById('show_commands_panel').checked != (preferenceslist[0].enable_commands_panel === 'true')) modified = true;
            //interval positions
            if (document.getElementById('preferences_pos_Interval_check').value != parseInt(preferenceslist[0].interval_positions)) modified = true;
            //interval status
            if (document.getElementById('preferences_status_Interval_check').value != parseInt(preferenceslist[0].interval_status)) modified = true;
            //xy feedrate
            if (document.getElementById('preferences_control_xy_velocity').value != parseInt(preferenceslist[0].xy_feedrate)) modified = true;
            //autoscroll
            if (document.getElementById('preferences_autoscroll').checked != (preferenceslist[0].enable_autoscroll === 'true')) modified = true;
            //Verbose Mode
            if (document.getElementById('preferences_verbose_mode').checked != (preferenceslist[0].enable_verbose_mode === 'true')) modified = true;
            //file filters
            if (document.getElementById('preferences_filters').value != preferenceslist[0].f_filters) modified = true;
            //probemaxtravel
            if (document.getElementById('preferences_probemaxtravel').value != parseFloat(preferenceslist[0].probemaxtravel)) modified = true;
            //probefeedrate
            if (document.getElementById('preferences_probefeedrate').value != parseInt(preferenceslist[0].probefeedrate)) modified = true;
            //probetouchplatethickness
            if (document.getElementById('preferences_probetouchplatethickness').value != parseFloat(preferenceslist[0].probetouchplatethickness)) modified = true;
            //surfacewidth
            if (document.getElementById('preferences_surfacewidth').value != parseFloat(preferenceslist[0].surfacewidth)) modified = true;
            //surfacelength
            if (document.getElementById('preferences_surfacelength').value != parseFloat(preferenceslist[0].surfacelength)) modified = true;
            //surfacezdepth
            if (document.getElementById('preferences_surfacezdepth').value != parseFloat(preferenceslist[0].surfacezdepth)) modified = true;
            //surfacebitdiam
            if (document.getElementById('preferences_surfacebitdiam').value != parseFloat(preferenceslist[0].surfacebitdiam)) modified = true;
            //surfacespindle
            if (document.getElementById('preferences_surfacespindle').value != parseInt(preferenceslist[0].surfacespindle)) modified = true;
            //surfacefeedrate
            if (document.getElementById('preferences_surfacefeedrate').value != parseInt(preferenceslist[0].surfacefeedrate)) modified = true;
            //surfacestepover
            if (document.getElementById('preferences_surfacestepover').value != parseInt(preferenceslist[0].surfacestepover)) modified = true;
        }
    } else modified = true;
    if (language_save != language) modified = true;
    if (modified) {
        confirmdlg(translate_text_item("Data modified"), translate_text_item("Do you want to save?"), process_preferencesCloseDialog)
    } else {
        closeModal('cancel');
    }
}

function process_preferencesCloseDialog(answer) {
    if (answer == 'no') {
        //console.log("Answer is no so exit");
        translate_text(language_save);
        closeModal('cancel');
    } else {
        // console.log("Answer is yes so let's save");
        SavePreferences();
    }
}

function SavePreferences(current_preferences) {
    if (http_communication_locked) {
        alertdlg(translate_text_item("Busy..."), translate_text_item("Communications are currently locked, please wait and retry."));
        return;
    }
    console.log("save prefs");
    if (((typeof (current_preferences) != 'undefined') && !current_preferences) || (typeof (current_preferences) == 'undefined')) {
        if (!Checkvalues("preferences_pos_Interval_check") ||
            !Checkvalues("preferences_status_Interval_check") ||
            !Checkvalues("preferences_control_xy_velocity") ||
            !Checkvalues("preferences_filters") ||
            !Checkvalues("preferences_probemaxtravel") ||
            !Checkvalues("preferences_probefeedrate") ||
            !Checkvalues("preferences_probetouchplatethickness") ||
            !Checkvalues("preferences_surfacewidth") ||
            !Checkvalues("preferences_surfacelength") ||
            !Checkvalues("preferences_surfacebitdiam") ||
            !Checkvalues("preferences_surfacespindle") ||
            !Checkvalues("preferences_surfacefeedrate") ||
            !Checkvalues("preferences_surfacestepover") ||
            !Checkvalues("preferences_surfacezdepth")
        ) return;
        preferenceslist = [];
        var saveprefs = "[{\"language\":\"" + language;
        saveprefs += "\",\"enable_camera\":\"" + document.getElementById('show_camera_panel').checked;
        saveprefs += "\",\"auto_load_camera\":\"" + document.getElementById('autoload_camera_panel').checked;
        saveprefs += "\",\"camera_address\":\"" + HTMLEncode(document.getElementById('preferences_camera_webaddress').value);
        saveprefs += "\",\"enable_lock_UI\":\"" + document.getElementById('enable_lock_UI').checked;
        saveprefs += "\",\"enable_ping\":\"" + document.getElementById('enable_ping').checked;
        saveprefs += "\",\"enable_redundant\":\"" + document.getElementById('enable_redundant_controls').checked;
        saveprefs += "\",\"enable_probe\":\"" + document.getElementById('enable_probe_controls').checked;
        saveprefs += "\",\"enable_fan\":\"" + document.getElementById('enable_fan_controls').checked;
        saveprefs += "\",\"enable_control_panel\":\"" + document.getElementById('show_control_panel').checked;
        saveprefs += "\",\"enable_grbl_probe_panel\":\"" + document.getElementById('show_grbl_probe_tab').checked;
        saveprefs += "\",\"enable_grbl_surface_panel\":\"" + document.getElementById('show_grbl_surface_tab').checked;
        saveprefs += "\",\"enable_grbl_panel\":\"" + document.getElementById('show_grbl_panel').checked;
        saveprefs += "\",\"enable_files_panel\":\"" + document.getElementById('show_files_panel').checked;
        saveprefs += "\",\"has_TFT_SD\":\"" + document.getElementById('has_tft_sd').checked;
        saveprefs += "\",\"has_TFT_USB\":\"" + document.getElementById('has_tft_usb').checked;
        saveprefs += "\",\"probemaxtravel\":\"" + document.getElementById('preferences_probemaxtravel').value;
        saveprefs += "\",\"probefeedrate\":\"" + document.getElementById('preferences_probefeedrate').value;
        saveprefs += "\",\"probetouchplatethickness\":\"" + document.getElementById('preferences_probetouchplatethickness').value;
        saveprefs += "\",\"surfacewidth\":\"" + document.getElementById('preferences_surfacewidth').value;
        saveprefs += "\",\"surfacelength\":\"" + document.getElementById('preferences_surfacelength').value;
        saveprefs += "\",\"surfacezdepth\":\"" + document.getElementById('preferences_surfacezdepth').value;
        saveprefs += "\",\"surfacebitdiam\":\"" + document.getElementById('preferences_surfacebitdiam').value;
        saveprefs += "\",\"surfacespindle\":\"" + document.getElementById('preferences_surfacespindle').value;
        saveprefs += "\",\"surfacefeedrate\":\"" + document.getElementById('preferences_surfacefeedrate').value;
        saveprefs += "\",\"surfacestepover\":\"" + document.getElementById('preferences_surfacestepover').value;
        saveprefs += "\",\"interval_positions\":\"" + document.getElementById('preferences_pos_Interval_check').value;
        saveprefs += "\",\"interval_status\":\"" + document.getElementById('preferences_status_Interval_check').value;
        saveprefs += "\",\"xy_feedrate\":\"" + document.getElementById('preferences_control_xy_velocity').value;
        saveprefs += "\",\"f_filters\":\"" + document.getElementById('preferences_filters').value;
        saveprefs += "\",\"enable_autoscroll\":\"" + document.getElementById('preferences_autoscroll').checked;
        saveprefs += "\",\"enable_verbose_mode\":\"" + document.getElementById('preferences_verbose_mode').checked;
        saveprefs += "\",\"enable_commands_panel\":\"" + document.getElementById('show_commands_panel').checked + "\"}]";
        preferenceslist = JSON.parse(saveprefs);
    }
    var blob = new Blob([JSON.stringify(preferenceslist, null, " ")], {
        type: 'application/json'
    });
    var file;
    if (browser_is("IE") || browser_is("Edge")) {
        file = blob;
        file.name = preferences_file_name;
        file.lastModifiedDate = new Date();
    } else file = new File([blob], preferences_file_name);
    var formData = new FormData();
    var url = "/files";
    formData.append('path', '/');
    formData.append('myfile[]', file, preferences_file_name);
    if ((typeof (current_preferences) != 'undefined') && current_preferences) SendFileHttp(url, formData);
    else SendFileHttp(url, formData, preferencesdlgUploadProgressDisplay, preferencesUploadsuccess, preferencesUploadfailed);
}

function preferencesdlgUploadProgressDisplay(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        document.getElementById('preferencesdlg_prg').value = percentComplete;
        document.getElementById('preferencesdlg_upload_percent').innerHTML = percentComplete.toFixed(0);
        document.getElementById('preferencesdlg_upload_msg').style.display = 'block';
    } else {
        // Impossible because size is unknown
    }
}

function preferencesUploadsuccess(response) {
    document.getElementById('preferencesdlg_upload_msg').style.display = 'none';
    applypreferenceslist();
    closeModal('ok');
}

function preferencesUploadfailed(errorcode, response) {
    alertdlg(translate_text_item("Error"), translate_text_item("Save preferences failed!"));
}


function Checkvalues(id_2_check) {
    var status = true;
    var value = 0;
    switch (id_2_check) {
        case "preferences_status_Interval_check":
        case "preferences_pos_Interval_check":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 100)) {
                error_message = translate_text_item("Value of auto-check must be between 0s and 99s !!");
                status = false;
            }
            break;
        case "preferences_control_xy_velocity":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("XY Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
        case "preferences_control_z_velocity":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1)) {
                error_message = translate_text_item("Z Feedrate value must be at least 1 mm/min!");
                status = false;
            }
            break;
        case "preferences_probefeedrate":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of probe feedrate must be between 1 mm/min and 9999 mm/min !");
                status = false;
            }
            break;
        case "preferences_probemaxtravel":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of maximum probe travel must be between 1 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_probetouchplatethickness":
            value = parseFloat(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
                error_message = translate_text_item("Value of probe touch plate thickness must be between 0 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_surfacewidth":
            value = parseFloat(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of surface width must be between 1 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_surfacelength":
            value = parseFloat(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1 && value <= 9999)) {
                error_message = translate_text_item("Value of surface length must be between 1 mm and 9999 mm !");
                status = false;
            }
            break;
        case "preferences_surfacezdepth":
            value = parseFloat(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 100)) {
                error_message = translate_text_item("Value of surface Zdepth must be between 0 mm and 100 mm !");
                status = false;
            }
            break;
        case "preferences_surfacebitdiam":
            value = parseFloat(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 0 && value <= 9999)) {
                error_message = translate_text_item("Value of bit diameter for surfacing must be between 0.1 mm and 999 mm !");
                status = false;
            }
            break;
        case "preferences_surfacespindle":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 1000 && value <= 50000)) {
                error_message = translate_text_item("Value of surfacing spindle RPM must be between 1000 mm and 50000 mm !");
                status = false;
            }
            break;
        case "preferences_surfacefeedrate":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 100 && value <= 10000)) {
                error_message = translate_text_item("Value of surfacing feedrate must be between 100 mm/min and 10000 mm/min !");
                status = false;
            }
            break;
        case "preferences_surfacestepover":
            value = parseInt(document.getElementById(id_2_check).value);
            if (!(!isNaN(value) && value >= 10 && value <= 90)) {
                error_message = translate_text_item("Value of surfacing stepover must be between 10 % and 90 % !");
                status = false;
            }
            break;
        case "preferences_filters":
            //TODO a regex would be better
            value = document.getElementById(id_2_check).value;
            if ((value.indexOf(".") != -1) ||
                (value.indexOf("*") != -1)) {
                error_message = translate_text_item("Only alphanumeric chars separated by ; for extensions filters");
                status = false;
            }
            break;
    }
    if (status) {
        document.getElementById(id_2_check + "_group").classList.remove("has-feedback");
        document.getElementById(id_2_check + "_group").classList.remove("has-error");
        document.getElementById(id_2_check + "_icon").innerHTML = "";
    } else {
        document.getElementById(id_2_check + "_group").classList.add("has-feedback");
        document.getElementById(id_2_check + "_group").classList.add("has-error");
        document.getElementById(id_2_check + "_icon").innerHTML = get_icon_svg("remove");
        alertdlg(translate_text_item("Out of range"), error_message);
    }
    return status;
}

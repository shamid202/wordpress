var time_buffer_value=0;var is_check_start_time_gone=false;var start_time_checking_index;function prepare_tooltip(myParam){wpbc_set_popover_in_cal(myParam);}
function hoverDayTime(value,date_obj,resource_id){wpbc_prepare_tooltip_content(value,date_obj,resource_id);}
function is_this_time_selections_not_available(resource_id,form_elements){var reslt=wpbc_is_this_time_selection_not_available(resource_id,form_elements);return reslt;}
function wpbc_set_popover_in_cal(resource_id){var tooltip_day_class_4_show=" .timespartly";if(is_show_availability_in_tooltips){if(wpdev_in_array(parent_booking_resources,resource_id))
tooltip_day_class_4_show=" .datepick-days-cell";}
if(is_show_cost_in_tooltips){tooltip_day_class_4_show=" .datepick-days-cell";}
if(typeof(global_avalaibility_times[resource_id])!="undefined"){if(global_avalaibility_times[resource_id].length>0)tooltip_day_class_4_show=" .datepick-days-cell";}
if('function'===typeof(jQuery("#calendar_booking"+resource_id+tooltip_day_class_4_show).popover)){jQuery("#calendar_booking"+resource_id+tooltip_day_class_4_show).popover({placement:'top auto',trigger:'hover',delay:{show:500,hide:1},content:'',template:'<div class="popover popover_calendar_hover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',container:'#calendar_booking'+resource_id,html:'true'});}}
function wpbc_sort_times_array(times_array){var sort_time_arr=[];var sort_time_obj=[];var time_second=0
var is_it_endtime=0;for(var i=0;i<times_array.length;i++){if(times_array[i].length>2){time_second=parseInt(times_array[i][0])*3600+parseInt(times_array[i][1])*60+parseInt(times_array[i][2]);is_it_endtime=time_second%10;if(2===is_it_endtime){time_second=time_second-10;}else{time_second=time_second+10;}
sort_time_obj[sort_time_obj.length]={second:time_second,value:times_array[i]};}}
sort_time_obj.sort(function(a,b){return a.second-b.second;});for(var i=0;i<sort_time_obj.length;i++){sort_time_arr[sort_time_arr.length]=sort_time_obj[i].value;}
return sort_time_arr;}
function wpbc_prepare_tooltip_content(value,date_obj,resource_id){if(date_obj==null)return;var i=0;var h='';var m='';var s='';var td_class;var tooltip_time='';var times_array=[];td_class=(date_obj.getMonth()+1)+'-'+date_obj.getDate()+'-'+date_obj.getFullYear();var times_array_approved=wpbc_get_times_from_dates_arr(date_approved,resource_id,td_class);for(i=0;i<times_array_approved.length;i++){times_array[times_array.length]=times_array_approved[i];}
var times_array_pending=wpbc_get_times_from_dates_arr(date2approve,resource_id,td_class);for(i=0;i<times_array_pending.length;i++){times_array[times_array.length]=times_array_pending[i];}
if(typeof(hover_day_check_global_time_availability)=='function'){times_array=hover_day_check_global_time_availability(date_obj,resource_id,times_array);}
if(times_array.length>0){times_array=wpbc_sort_times_array(times_array);}
for(i=0;i<times_array.length;i++){s=parseInt(times_array[i][2]);if(s==2){if(tooltip_time=='')tooltip_time='&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp; - ';}
if((tooltip_time=='')&&(times_array[i][0]=='00')&&(times_array[i][1]=='00'))
tooltip_time='&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;';else if((i==(times_array.length-1))&&(times_array[i][0]=='23')&&(times_array[i][1]=='59'))
tooltip_time+=' &nbsp;&nbsp;&nbsp;&nbsp;... ';else{var hours_show=times_array[i][0];var hours_show_sufix='';if(is_am_pm_inside_time){if(hours_show>=12){hours_show=hours_show-12;if(hours_show==0)hours_show=12;hours_show_sufix=' pm';}else{hours_show_sufix=' am';}}
if(times_array[i][2]=='02'){times_array[i][1]=(times_array[i][1]*1)+time_buffer_value;if(times_array[i][1]>59){times_array[i][1]=times_array[i][1]-60;hours_show=(hours_show*1)+1;}
if(times_array[i][1]<10)times_array[i][1]='0'+times_array[i][1];}
tooltip_time+=hours_show+':'+times_array[i][1]+hours_show_sufix;}
if(s==1){tooltip_time+=' - ';if(i==(times_array.length-1))tooltip_time+=' &nbsp;&nbsp;&nbsp;&nbsp;... ';}
if(s==2){if(typeof(wpbc_get_additional_info_for_tooltip)=='function'){tooltip_time+=wpbc_get_additional_info_for_tooltip(resource_id,td_class,parseInt(times_array[i][0]*60)+parseInt(times_array[i][1]));}
tooltip_time+='<br/>';}}
if(tooltip_time.indexOf("undefined")>-1){tooltip_time='';}
else{if((tooltip_time!='')&&(bk_highlight_timeslot_word!='')){if(is_booking_used_check_in_out_time===true)
tooltip_time='';else
tooltip_time='<span class="wpbc_booked_times_word">'+bk_highlight_timeslot_word+' </span><br />'+tooltip_time;}}
if(typeof(getDayPrice4Show)=='function'){tooltip_time=getDayPrice4Show(resource_id,tooltip_time,td_class);}
if(typeof(getDayAvailability4Show)=='function'){tooltip_time=getDayAvailability4Show(resource_id,tooltip_time,td_class);}
jQuery('#calendar_booking'+resource_id+' td.cal4date-'+td_class).attr('data-content',tooltip_time);}
function wpbc_get_times_from_dates_arr(dates_arr,resource_id,td_class){var i;var h='';var m='';var s='';var times_array=[];if((typeof(dates_arr[resource_id])!=='undefined')&&(typeof(dates_arr[resource_id][td_class])!=='undefined')&&((dates_arr[resource_id][td_class][0][3]!=0)||(dates_arr[resource_id][td_class][0][4]!=0))){for(i=0;i<dates_arr[resource_id][td_class].length;i++){h=dates_arr[resource_id][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=dates_arr[resource_id][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=dates_arr[resource_id][td_class][i][5];if(s==2)s='02';if(s==1)s='01';if(s==0)s='00';times_array[times_array.length]=[h,m,s];}}
return times_array;}
function wpbc_is_time_field_in_booking_form(resource_id,form_elements){var count=form_elements.length;var start_time=false;var end_time=false;var duration=false;var element;for(var i=0;i<count;i++){element=form_elements[i];if(jQuery(element).closest('.booking_form_garbage').length){continue;}
if(element.name!=undefined){var my_element=element.name;if(my_element.indexOf('rangetime')!==-1){return true;}
if((my_element.indexOf('durationtime')!==-1)){duration=element.value;}
if(my_element.indexOf('starttime')!==-1){start_time=element.value;}
if(my_element.indexOf('endtime')!==-1){end_time=element.value;}}}
if((duration!==false)&&(start_time!==false)){return true;}
if((start_time!==false)&&(end_time!==false)){return true;}
return false;}
function wpbc_is_this_time_selection_not_available(resource_id,form_elements){if(location.href.indexOf('page=wpbc-new')>0){return false;}
var count=form_elements.length;var start_time=false;var end_time=false;var duration=false;var element;var element_start=false;var element_end=false;var element_duration=false;var element_rangetime=false;for(var i=0;i<count;i++){element=form_elements[i];if(jQuery(element).closest('.booking_form_garbage').length){continue;}
if(element.name!=undefined){var my_element=element.name;if(my_element.indexOf('rangetime')!==-1){if(element.value==''){showErrorMessage(element,message_verif_requred,false);return true;}
var my_rangetime=element.value.split('-');if(my_rangetime.length>1){start_time=my_rangetime[0].replace(/(^\s+)|(\s+$)/g,"");end_time=my_rangetime[1].replace(/(^\s+)|(\s+$)/g,"");element_rangetime=element;}}
if((my_element.indexOf('durationtime')!==-1)){duration=element.value;element_duration=element;}
if(my_element.indexOf('starttime')!==-1){start_time=element.value;element_start=element;}
if(my_element.indexOf('endtime')!==-1){end_time=element.value;element_end=element;}}}
if((duration!==false)&&(start_time!==false)){var mylocalstarttime=start_time.split(':');var d=new Date(1980,1,1,mylocalstarttime[0],mylocalstarttime[1],0);var my_duration=duration.split(':');my_duration=my_duration[0]*60*60*1000+my_duration[1]*60*1000;d.setTime(d.getTime()+my_duration);var my_hours=d.getHours();if(my_hours<10)my_hours='0'+(my_hours+'');var my_minutes=d.getMinutes();if(my_minutes<10)my_minutes='0'+(my_minutes+'');end_time=(my_hours+'')+':'+(my_minutes+'');if(end_time=='00:00')end_time='23:59';}
if((start_time===false)||(end_time===false)){return false;}else{var valid_time=true;if((start_time=='')||(end_time==''))valid_time=false;if(!isValidTimeTextField(start_time))valid_time=false;if(!isValidTimeTextField(end_time))valid_time=false;if(valid_time===true)
if((typeof(checkRecurentTimeInside)=='function')&&(typeof(is_booking_recurrent_time)!=='undefined')&&(is_booking_recurrent_time==true)){valid_time=checkRecurentTimeInside([start_time,end_time],resource_id);}else{if(typeof(checkTimeInside)=='function'){valid_time=checkTimeInside(start_time,true,resource_id);}
if(valid_time===true){if(typeof(checkTimeInside)=='function'){valid_time=checkTimeInside(end_time,false,resource_id);}}}
if(valid_time!==true){if((is_booking_used_check_in_out_time)&&(element_start!==false)&&(element_end!==false)){showMessageUnderElement('#date_booking'+resource_id,message_checkinouttime_error,'');makeScroll('#calendar_booking'+resource_id);return true;}
if(element_rangetime!==false)showErrorTimeMessage(message_rangetime_error,element_rangetime);if(element_duration!==false)showErrorTimeMessage(message_durationtime_error,element_duration);if(element_start!==false)showErrorTimeMessage(message_starttime_error,element_start);if(element_end!==false)showErrorTimeMessage(message_endtime_error,element_end);return true;}else{return false;}}}
function isTimeTodayGone(myTime,sort_date_array){var date_to_check=sort_date_array[0];if(is_check_start_time_gone==false){date_to_check=sort_date_array[(sort_date_array.length-1)];}
if(parseInt(date_to_check[0])<parseInt(wpdev_bk_today[0]))return true;if((parseInt(date_to_check[0])==parseInt(wpdev_bk_today[0]))&&(parseInt(date_to_check[1])<parseInt(wpdev_bk_today[1])))
return true;if((parseInt(date_to_check[0])==parseInt(wpdev_bk_today[0]))&&(parseInt(date_to_check[1])==parseInt(wpdev_bk_today[1]))&&(parseInt(date_to_check[2])<parseInt(wpdev_bk_today[2])))
return true;if((parseInt(date_to_check[0])==parseInt(wpdev_bk_today[0]))&&(parseInt(date_to_check[1])==parseInt(wpdev_bk_today[1]))&&(parseInt(date_to_check[2])==parseInt(wpdev_bk_today[2]))){var mytime_value=myTime.split(":");mytime_value=mytime_value[0]*60+parseInt(mytime_value[1]);var current_time_value=wpdev_bk_today[3]*60+parseInt(wpdev_bk_today[4]);if(current_time_value>mytime_value)return true;}
return false;}
function checkTimeInside(mytime,is_start_time,bk_type){if(typeof(check_entered_time_to_global_availability_time)=='function'){if(!check_entered_time_to_global_availability_time(mytime,is_start_time,bk_type))return false;}
var my_dates_str=document.getElementById('date_booking'+bk_type).value;return checkTimeInsideProcess(mytime,is_start_time,bk_type,my_dates_str);}
function checkRecurentTimeInside(my_rangetime,bk_type){var valid_time=true;var my_dates_str=document.getElementById('date_booking'+bk_type).value;var date_array=my_dates_str.split(", ");if(date_array.length==2){if(date_array[0]==date_array[1]){date_array=[date_array[0]];}}
var temp_date_str='';for(var i=0;i<date_array.length;i++){temp_date_str=date_array[i];if(checkTimeInsideProcess(my_rangetime[0],true,bk_type,temp_date_str)==false)valid_time=false;if(checkTimeInsideProcess(my_rangetime[1],false,bk_type,temp_date_str)==false)valid_time=false;}
return valid_time;}
function checkTimeInsideProcess(mytime,is_start_time,bk_type,my_dates_str){var date_array=my_dates_str.split(", ");if(date_array.length==2){if(date_array[0]==date_array[1]){date_array=[date_array[0]];}}
var temp_elemnt;var td_class;var sort_date_array=[];var work_date_array=[];var times_array=[];var is_check_for_time;for(var i=0;i<date_array.length;i++){temp_elemnt=date_array[i].split(".");sort_date_array[i]=[temp_elemnt[2],temp_elemnt[1]+'',temp_elemnt[0]+''];}
sort_date_array.sort();for(i=0;i<sort_date_array.length;i++){sort_date_array[i]=[parseInt(sort_date_array[i][0]*1),parseInt(sort_date_array[i][1]*1),parseInt(sort_date_array[i][2]*1)];}
if(((is_check_start_time_gone)&&(is_start_time))||((!is_check_start_time_gone)&&(!is_start_time))){if(isTimeTodayGone(mytime,sort_date_array))return false;}
work_date_array=sort_date_array;for(var j=0;j<work_date_array.length;j++){td_class=work_date_array[j][1]+'-'+work_date_array[j][2]+'-'+work_date_array[j][0];if((j==0)||(j==(work_date_array.length-1)))is_check_for_time=true;else is_check_for_time=false;if(typeof(date2approve[bk_type])!=='undefined'){if((typeof(date2approve[bk_type][td_class])!=='undefined')){if(!is_check_for_time){return false;}
if((date2approve[bk_type][td_class][0][3]!=0)||(date2approve[bk_type][td_class][0][4]!=0)){}else{return false;}}}
if(typeof(date_approved[bk_type])!=='undefined'){if((typeof(date_approved[bk_type][td_class])!=='undefined')){if(!is_check_for_time){return false;}
if((date_approved[bk_type][td_class][0][3]!=0)||(date_approved[bk_type][td_class][0][4]!=0)){}else{return false;}}}}
if(is_start_time)work_date_array=sort_date_array[0];else work_date_array=sort_date_array[sort_date_array.length-1];td_class=work_date_array[1]+'-'+work_date_array[2]+'-'+work_date_array[0];if(typeof(date2approve[bk_type])!=='undefined')
if(typeof(date2approve[bk_type][td_class])!=='undefined')
for(i=0;i<date2approve[bk_type][td_class].length;i++){h=date2approve[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date2approve[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date2approve[bk_type][td_class][i][5];if(s=='02'){m=(m*1)+time_buffer_value;if(m>59){m=m-60;h=(h*1)+1;}
if(m<10)m='0'+m;}
times_array[times_array.length]=[h,m,s];}
if(typeof(date_approved[bk_type])!=='undefined')
if(typeof(date_approved[bk_type][td_class])!=='undefined')
for(i=0;i<date_approved[bk_type][td_class].length;i++){h=date_approved[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date_approved[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date_approved[bk_type][td_class][i][5];if(s=='02'){m=(m*1)+time_buffer_value;if(m>59){m=m-60;h=(h*1)+1;}
if(m<10)m='0'+m;}
times_array[times_array.length]=[h,m,s];}
times_array.sort();var times_in_day=[];var times_in_day_interval_marks=[];for(i=0;i<times_array.length;i++){s=times_array[i][2];if((s==2)&&(i==0)){times_in_day[times_in_day.length]=0;times_in_day_interval_marks[times_in_day_interval_marks.length]=1;}
times_in_day[times_in_day.length]=times_array[i][0]*60+parseInt(times_array[i][1]);times_in_day_interval_marks[times_in_day_interval_marks.length]=s;if((s==1)&&(i==(times_array.length-1))){times_in_day[times_in_day.length]=(24*60);times_in_day_interval_marks[times_in_day_interval_marks.length]=2;}}
var mytime_value=mytime.split(":");mytime_value=mytime_value[0]*60+parseInt(mytime_value[1]);var start_i=0;if(start_time_checking_index!=undefined)
if(start_time_checking_index[0]!=undefined)
if((!is_start_time)&&(sort_date_array.length==1)){start_i=start_time_checking_index[0];}
i=start_i;for(i=start_i;i<times_in_day.length;i++){times_in_day[i]=parseInt(times_in_day[i]);mytime_value=parseInt(mytime_value);if(is_start_time){if(mytime_value>times_in_day[i]){}else if(mytime_value==times_in_day[i]){if(times_in_day_interval_marks[i]==1){return false;}else{if((i+1)<=(times_in_day.length-1)){if(times_in_day[i+1]<=mytime_value)return false;else{if(sort_date_array.length>1)
if((i+1)<=(times_in_day.length-1))return false;start_time_checking_index=[i,td_class,mytime_value];return true;}}
if(sort_date_array.length>1)
if((i+1)<=(times_in_day.length-1))return false;start_time_checking_index=[i,td_class,mytime_value];return true;}}else if(mytime_value<times_in_day[i]){if(times_in_day_interval_marks[i]==2){return false;}else{if(sort_date_array.length>1)
if((i+1)<=(times_in_day.length-1))return false;start_time_checking_index=[i,td_class,mytime_value];return true;}}}else{if(sort_date_array.length==1){if(start_time_checking_index!=undefined)
if(start_time_checking_index[2]!=undefined)
if((start_time_checking_index[2]==times_in_day[i])&&(times_in_day_interval_marks[i]==2)){}else if(times_in_day[i]<mytime_value)return false;else{if(start_time_checking_index[2]>=mytime_value)return false;return true;}}else{if(times_in_day[i]<mytime_value)return false;else return true;}}}
if(is_start_time)start_time_checking_index=[i,td_class,mytime_value];else{if(start_time_checking_index!=undefined)
if(start_time_checking_index[2]!=undefined)
if((sort_date_array.length==1)&&(start_time_checking_index[2]>=mytime_value))return false;}
return true;}
function showErrorTimeMessage(my_message,element){var element_name=element.name;makeScroll(element);if(jQuery("[name='"+element_name+"']").is(':visible')){jQuery("[name='"+element_name+"']").css({'border':'1px solid red'}).fadeOut(350).fadeIn(500).animate({opacity:1},4000).animate({border:'1px solid #DFDFDF'},100);}
jQuery("[name='"+element_name+"']").after('<div class="wpdev-help-message alert alert-warning">'+my_message+'</div>');jQuery(".wpdev-help-message").animate({opacity:1},10000).fadeOut(2000);jQuery(element).trigger('focus');return true;}
function isValidTimeTextField(timeStr){var timePat=/^(\d{1,2}):(\d{2})(\s?(AM|am|PM|pm))?$/;var matchArray=timeStr.match(timePat);if(matchArray==null){return false;}
var hour=matchArray[1];var minute=matchArray[2];var ampm=matchArray[4];if(ampm==""){ampm=null}
if(hour<0||hour>24){return false;}
if(hour>12&&ampm!=null){return false;}
if(minute<0||minute>59){return false;}
return true;}
function bkDisableBookedTimeSlots(all_dates,bk_type){var inst=jQuery.datepick._getInst(document.getElementById('calendar_booking'+bk_type));var td_class;var time_slot_field_name='select[name="rangetime'+bk_type+'"]';var time_slot_field_name2='select[name="rangetime'+bk_type+'[]"]';var start_time_slot_field_name='select[name="starttime'+bk_type+'"]';var start_time_slot_field_name2='select[name="starttime'+bk_type+'[]"]';var end_time_slot_field_name='select[name="endtime'+bk_type+'"]';var end_time_slot_field_name2='select[name="endtime'+bk_type+'[]"]';all_dates=get_first_day_of_selection(all_dates);if((bk_days_selection_mode=='single')){var current_single_day_selections=all_dates.split('.');td_class=(current_single_day_selections[1]*1)+'-'+(current_single_day_selections[0]*1)+'-'+(current_single_day_selections[2]*1);var times_array=[];jQuery(time_slot_field_name+' option:disabled,'+time_slot_field_name2+' option:disabled,'
+start_time_slot_field_name+' option:disabled,'+start_time_slot_field_name2+' option:disabled,'
+end_time_slot_field_name+' option:disabled,'+end_time_slot_field_name2+' option:disabled').removeClass('booked');jQuery(time_slot_field_name+' option:disabled,'+time_slot_field_name2+' option:disabled,'
+start_time_slot_field_name+' option:disabled,'+start_time_slot_field_name2+' option:disabled,'
+end_time_slot_field_name+' option:disabled,'+end_time_slot_field_name2+' option:disabled').prop('disabled',false);if(jQuery(time_slot_field_name+','+time_slot_field_name2+','+start_time_slot_field_name+','+start_time_slot_field_name2).length==0)return;var range_time_object=jQuery(time_slot_field_name+' option:first,'+time_slot_field_name2+' option:first,'+start_time_slot_field_name+' option:first,'+start_time_slot_field_name2+' option:first');if(range_time_object==undefined)return;if(typeof(date_approved[bk_type])!=='undefined')
if(typeof(date_approved[bk_type][td_class])!=='undefined'){if((date_approved[bk_type][td_class][0][3]!=0)||(date_approved[bk_type][td_class][0][4]!=0)){for(i=0;i<date_approved[bk_type][td_class].length;i++){h=date_approved[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date_approved[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date_approved[bk_type][td_class][i][5];if(s==2)s='02';times_array[times_array.length]=[h,m,s];}}}
if(typeof(date2approve[bk_type])!=='undefined')
if(typeof(date2approve[bk_type][td_class])!=='undefined')
if((date2approve[bk_type][td_class][0][3]!=0)||(date2approve[bk_type][td_class][0][4]!=0))
{for(i=0;i<date2approve[bk_type][td_class].length;i++){h=date2approve[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date2approve[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date2approve[bk_type][td_class][i][5];if(s==2)s='02';times_array[times_array.length]=[h,m,s];}}
times_array.sort();if(times_array.length>0){s=parseInt(times_array[0][2]);if(s==2){times_array[times_array.length]=['00','00','01'];times_array.sort();}
s=parseInt(times_array[(times_array.length-1)][2]);if(s==1){times_array[times_array.length]=['23','59','02'];times_array.sort();}}
var check_times_fields=[[time_slot_field_name,time_slot_field_name2],[start_time_slot_field_name,start_time_slot_field_name2]];if((bk_days_selection_mode=='single')){check_times_fields.push([end_time_slot_field_name,end_time_slot_field_name2]);}
for(var ctf=0;ctf<check_times_fields.length;ctf++){var time_field_to_check=check_times_fields[ctf];var removed_time_slots=is_time_slot_booked_for_this_time_array(bk_type,times_array,td_class,time_field_to_check);var my_time_value=jQuery(time_field_to_check[0]+' option,'+time_field_to_check[1]+' option');for(j=0;j<my_time_value.length;j++){if(wpdev_in_array(removed_time_slots,j)){jQuery(time_field_to_check[0]+' option:eq('+j+'),'+time_field_to_check[1]+' option:eq('+j+')').attr('disabled','disabled');jQuery(time_field_to_check[0]+' option:eq('+j+'),'+time_field_to_check[1]+' option:eq('+j+')').addClass('booked');if(jQuery(time_field_to_check[0]+' option:eq('+j+'),'+time_field_to_check[1]+' option:eq('+j+')').attr('selected')){jQuery(time_field_to_check[0]+' option:eq('+j+'),'+time_field_to_check[1]+' option:eq('+j+')').removeAttr('selected');if(IEversion_4_bk==7){var rangetime_element=document.getElementsByName("rangetime"+bk_type);if(typeof(rangetime_element)!='undefined'&&rangetime_element!=null){set_selected_first_not_disabled_option_IE7(document.getElementsByName("rangetime"+bk_type)[0]);}
var start_element=document.getElementsByName("starttime"+bk_type);if(typeof(start_element)!='undefined'&&start_element!=null){set_selected_first_not_disabled_option_IE7(document.getElementsByName("starttime"+bk_type)[0]);}}}}}}
if(IEversion_4_bk==7){emulate_disabled_options_to_gray_IE7("rangetime"+bk_type);emulate_disabled_options_to_gray_IE7("starttime"+bk_type);emulate_disabled_options_to_gray_IE7("endtime"+bk_type);}}
jQuery(".booking_form_div").trigger('wpbc_hook_timeslots_disabled',[bk_type,all_dates]);}
var isIE_4_bk=(navigator.appName=="Microsoft Internet Explorer");var IEversion_4_bk=navigator.appVersion;if(isIE_4_bk){IEversion_4_bk=parseInt(IEversion_4_bk.substr(IEversion_4_bk.indexOf("MSIE")+4));}else{IEversion_4_bk=0;}
if(IEversion_4_bk==7){window.onload=function(){if(document.getElementsByTagName){var s=document.getElementsByTagName("select");if(s.length>0){window.select_current=new Array();for(var i=0,select;select=s[i];i++){select.onfocus=function(){window.select_current[this.id]=this.selectedIndex;}
select.onchange=function(){set_selected_previos_selected_option_IE7(this);}
emulate_disabled_options_to_gray_IE7(select.name);}}}}
function set_selected_previos_selected_option_IE7(e){if(e.options[e.selectedIndex].disabled){e.selectedIndex=window.select_current[e.id];}}
function set_selected_first_not_disabled_option_IE7(e){if(e.options[e.selectedIndex].disabled){for(var i=0,option;option=e.options[i];i++){if(!option.disabled){e.selectedIndex=i;return 0;}}}
return 0;}
function emulate_disabled_options_to_gray_IE7(ename){jQuery('select[name="'+ename+'"] option,select[name="'+ename+'[]"] option').each(function(index){if(jQuery(this).prop('disabled')){jQuery(this).css('color','graytext');}else{jQuery(this).css('color','menutext');}});}}
function is_time_slot_booked_for_this_time_array(bk_type,times_array,td_class,time_field_to_check){if(typeof(wpbc_get_conditional_section_id_for_weekday)=='function'){var conditional_field_element_id=wpbc_get_conditional_section_id_for_weekday(td_class,bk_type);if(conditional_field_element_id!==false){time_field_to_check[0]=conditional_field_element_id+' '+time_field_to_check[0];time_field_to_check[1]=conditional_field_element_id+' '+time_field_to_check[1];}}
times_array.sort();var my_time_value='';var j;var bk_time_slot_selection='';var minutes_booked;var minutes_slot;var my_range_time;var removed_time_slots=[];if(times_array.length>0){if(parseInt(times_array[0][2])==2){var new_times_array=[];new_times_array[new_times_array.length]=['00','00','01'];for(var i=0;i<times_array.length;i++){new_times_array[new_times_array.length]=times_array[i];}
times_array=new_times_array;}
if(parseInt(times_array[(times_array.length-1)][2])==1){times_array[times_array.length]=['23','59','02'];}}
for(var i=0;i<times_array.length;i++){var s=parseInt(times_array[i][2]);if(i>0){if(s==2){my_range_time=times_array[i-1][0]+':'+times_array[i-1][1]+' - '+times_array[i][0]+':'+times_array[i][1];my_time_value=jQuery(time_field_to_check[0]+' option,'+time_field_to_check[1]+' option');for(j=0;j<my_time_value.length;j++){if(my_time_value[j].value==my_range_time){removed_time_slots[removed_time_slots.length]=j;}else{bk_time_slot_selection=my_time_value[j].value;var is_time_range=bk_time_slot_selection.indexOf("-");if(is_time_range>-1){bk_time_slot_selection=bk_time_slot_selection.split('-');bk_time_slot_selection[0]=bk_time_slot_selection[0].trim();bk_time_slot_selection[1]=bk_time_slot_selection[1].trim();bk_time_slot_selection[0]=bk_time_slot_selection[0].split(':');bk_time_slot_selection[1]=bk_time_slot_selection[1].split(':');minutes_booked=[(parseInt(times_array[i-1][0]*60)+parseInt(times_array[i-1][1])),(parseInt(times_array[i][0]*60)+parseInt(times_array[i][1]))];minutes_slot=[(parseInt(bk_time_slot_selection[0][0]*60)+parseInt(bk_time_slot_selection[0][1])),(parseInt(bk_time_slot_selection[1][0]*60)+parseInt(bk_time_slot_selection[1][1]))];if(((minutes_booked[0]>=minutes_slot[0])&&(minutes_booked[0]<minutes_slot[1]))||((minutes_booked[1]>minutes_slot[0])&&(minutes_booked[1]<=minutes_slot[1]))||((minutes_slot[0]>=minutes_booked[0])&&(minutes_slot[0]<minutes_booked[1]))||((minutes_slot[1]>minutes_booked[0])&&(minutes_slot[1]<=minutes_booked[1]))){removed_time_slots[removed_time_slots.length]=j;}}else{bk_time_slot_selection=bk_time_slot_selection.split(':');minutes_booked=[(parseInt(times_array[i-1][0]*60)+parseInt(times_array[i-1][1])),(parseInt(times_array[i][0]*60)+parseInt(times_array[i][1]))];minutes_slot=[(parseInt(bk_time_slot_selection[0]*60)+parseInt(bk_time_slot_selection[1]))];var is_end_time=time_field_to_check[0].indexOf("endtime");if(-1!==is_end_time){minutes_booked[0]=minutes_booked[0]*60;minutes_booked[1]=minutes_booked[1]*60;minutes_slot[0]=minutes_slot[0]*60-10;}
if(((minutes_slot[0]>=minutes_booked[0])&&(minutes_slot[0]<minutes_booked[1]))){removed_time_slots[removed_time_slots.length]=j;}}}}}}}
return removed_time_slots;}
function isDayFullByTime(bk_type,td_class){var times_array=[];var time_slot_field_name='select[name="rangetime'+bk_type+'"]';var time_slot_field_name2='select[name="rangetime'+bk_type+'[]"]';if(typeof(wpbc_get_conditional_section_id_for_weekday)=='function'){var conditional_field_element_id=wpbc_get_conditional_section_id_for_weekday(td_class,bk_type);if(conditional_field_element_id!==false){time_slot_field_name=conditional_field_element_id+' '+'select[name="rangetime'+bk_type+'"]';time_slot_field_name2=conditional_field_element_id+' '+'select[name="rangetime'+bk_type+'[]"]';}}
if(typeof(wpbc_get_conditional_section_id_for_seasons)=='function'){var conditional_field_element_id2=wpbc_get_conditional_section_id_for_seasons(td_class,bk_type);if(conditional_field_element_id2!==false){time_slot_field_name=conditional_field_element_id2+' '+'select[name="rangetime'+bk_type+'"]';time_slot_field_name2=conditional_field_element_id2+' '+'select[name="rangetime'+bk_type+'[]"]';}}
if(typeof(date_approved[bk_type])!=='undefined')
if(typeof(date_approved[bk_type][td_class])!=='undefined'){for(i=0;i<date_approved[bk_type][td_class].length;i++){if((date_approved[bk_type][td_class][0][3]!=0)||(date_approved[bk_type][td_class][0][4]!=0)){h=date_approved[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date_approved[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date_approved[bk_type][td_class][i][5];if(s==2)s='02';times_array[times_array.length]=[h,m,s];}}}
if(typeof(date2approve[bk_type])!=='undefined')
if(typeof(date2approve[bk_type][td_class])!=='undefined')
for(i=0;i<date2approve[bk_type][td_class].length;i++){if((date2approve[bk_type][td_class][0][3]!=0)||(date2approve[bk_type][td_class][0][4]!=0)){h=date2approve[bk_type][td_class][i][3];if(h<10)h='0'+h;if(h==0)h='00';m=date2approve[bk_type][td_class][i][4];if(m<10)m='0'+m;if(m==0)m='00';s=date2approve[bk_type][td_class][i][5];if(s==2)s='02';times_array[times_array.length]=[h,m,s];}}
times_array.sort();var start_time_fields='select[name="starttime'+bk_type+'"]';var start_time_fields2='select[name="starttime'+bk_type+'[]"]';var is_element_exist=jQuery(time_slot_field_name+','+time_slot_field_name2+','+start_time_fields+','+start_time_fields2).length;if(is_element_exist){var my_timerange_value=jQuery(time_slot_field_name+' option,'+time_slot_field_name2+' option');var my_st_en_times;var my_temp_time;var times_ranges_array=[];for(var j=0;j<my_timerange_value.length;j++){my_st_en_times=my_timerange_value[j].value.split(' - ');my_temp_time=my_st_en_times[0].split(':');times_ranges_array[times_ranges_array.length]=[my_temp_time[0],my_temp_time[1],'01'];my_temp_time=my_st_en_times[1].split(':');times_ranges_array[times_ranges_array.length]=[my_temp_time[0],my_temp_time[1],'02'];}
if(times_array.length==times_ranges_array.length){var is_all_same=true;for(var i=0;i<times_array.length;i++){if((times_array[i][0]!=times_ranges_array[i][0])||(times_array[i][1]!=times_ranges_array[i][1])||(times_array[i][2]!=times_ranges_array[i][2]))
is_all_same=false;}
if(is_all_same)return true;}
var my_start_time_options=jQuery(start_time_fields+' option,'+start_time_fields2+' option');if((my_start_time_options.length>0)&&((bk_days_selection_mode=='single'))){var removed_time_slots=is_time_slot_booked_for_this_time_array(bk_type,times_array,td_class,[start_time_fields,start_time_fields2]);var some_exist_time_slots=[];var my_time_value=jQuery(start_time_fields+' option,'+start_time_fields2+' option');for(j=0;j<my_time_value.length;j++){if(wpdev_in_array(removed_time_slots,j)){}else{some_exist_time_slots[some_exist_time_slots.length]=j;}}
if(some_exist_time_slots.length==0)return true;}
if((my_timerange_value.length>0)&&((bk_days_selection_mode=='single')||(bk_days_selection_mode=='multiple'))){var removed_time_slots=is_time_slot_booked_for_this_time_array(bk_type,times_array,td_class,[time_slot_field_name,time_slot_field_name2]);var some_exist_time_slots=[];var my_time_value=jQuery(time_slot_field_name+' option,'+time_slot_field_name2+' option');for(j=0;j<my_time_value.length;j++){if(wpdev_in_array(removed_time_slots,j)){}else{some_exist_time_slots[some_exist_time_slots.length]=j;}}
if(some_exist_time_slots.length==0)return true;}}
for(var i=0;i<times_array.length;i++){s=parseInt(times_array[i][2]);if(i==0)
if(s!==2){return false;}
if(i>0){if(s==1)
if(!((times_array[i-1][0]==times_array[i][0])&&(times_array[i-1][1]==times_array[i][1]))){return false;}}
if(i==(times_array.length-1))
if(s!==1){return false;}}
return true;}
$(document).ready(function(){
    $('#calendar').fullCalendar({
        minTime: '06:00:00',
        maxTime: '16:00:00',
        contentHeight: 420,
        allDaySlot: false,
        defaultView: 'agendaWeek',
        axisFormat: 'H:mm',
        timeFormat: 'H:mm',
        columnFormat: {
            month: 'ddd',    // Mon
            week: 'M-D ddd', // Mon 9/7
            day: 'dddd'
        },
        header: {
            left: '',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
            /*
             var title = prompt('Event Title:');
             var eventData;
             if (title) {
             eventData = {
             title: title,
             start: start,
             end: end
             };
             $('#calendar').fullCalendar('renderEvent', eventData, true);
             }
             $('#calendar').fullCalendar('unselect');
             */
        },
        //editable: true,
        //eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'Meeting',
                start: '2014-10-24T10:30:00',
                end: '2014-10-24T12:30:00',
                className: "sadfsdafsad",
                id: 'fsadfsad'
            }
        ],
        eventClick: function(){
            console.log(arguments);
        },
        dayClick: function() {
            console.log(arguments);
        }
    });



    function hfcalendar(el, options){
        this.init(el, options);
    }
    hfcalendar.prototype.init = function(el, options){
        var self = this;
        if(!options){
            options = {};
        }
        var widgetEnv = {
            nextName: options.nextName || "next",
            prevName: options.prevName || "prev"
        };
        var widgetHead = '<div class="widgetHead"><div class="title"></div><div class="next">'+widgetEnv.nextName+'</div><div class="prev">'+widgetEnv.prevName+'</div></div>';
        var widgetBody = '<div class="widgetBody"></div>';
        var widget = widgetHead + widgetBody;
        el.append(widget);

        var elTitle = el.children(".widgetHead");
        var elSet = {
            init: el,
            elTitle: elTitle,
            body: el.children(".widgetBody"),
            title: elTitle.children(".title"),
            next: elTitle.children(".next"),
            prev: elTitle.children(".prev")
        };

        this.el = elSet;

        this.render(options);
        el.on('click', '.next', function(e){
            self.renderNext();
        });
        el.on('click', '.prev', function(e){
            self.renderPrev();
        });
    };
    hfcalendar.prototype.render = function(options){
        this.setOptions(options);
        this.setValue();
        var calendar = this.getCalendar();
        var title = this.getCalendarTitle();
        this.el.title.text(title);
        this.el.body.html(calendar);
    };
    hfcalendar.prototype.renderNext = function(){
        var options = this.envValue;
        var nextMonth = options.nextYYYYMM;
        this.render({
            date: nextMonth
        })
    };
    hfcalendar.prototype.renderPrev = function(){
        var options = this.envValue;
        var prevMonth = options.prevYYYYMM;
        this.render({
            date: prevMonth
        })
    };
    hfcalendar.prototype.setOptions = function(options){
        if(!options){
            options = {};
        }
        this.options = {
            date : options.date || moment().format('YYYY-M-D')
        };
    };
    hfcalendar.prototype.setValue = function(){
        var options = this.options;
        var now = moment(options.date);
        var nowdaysInMonth = now.daysInMonth();
        var nowYYYYMM = now.format('YYYY-M');
        var nextdaysInMonth = moment().add(1, 'month').daysInMonth();
        var prevMonth = moment(options.date).subtract(1, 'month');
        var prevYYYYMM = prevMonth.format('YYYY-M');
        var prevdaysInMonth = prevMonth.daysInMonth();
        var nextMonth = moment(options.date).add(1, 'month');
        var nextYYYYMM = nextMonth.format('YYYY-M');
        var monthFirstDay = moment(moment(options.date).format("YYYY-MM")).day();
        var mincalendartitle = now.format('YYYY年MMM');
        this.envValue = {
            now: now,
            nowdaysInMonth: nowdaysInMonth,
            nowYYYYMM: nowYYYYMM,
            nextdaysInMonth : nextdaysInMonth,
            prevMonth : prevMonth,
            prevYYYYMM: prevYYYYMM,
            prevdaysInMonth: prevdaysInMonth,
            nextMonth: nextMonth,
            nextYYYYMM: nextYYYYMM,
            monthFirstDay: monthFirstDay,
            mincalendartitle: mincalendartitle
        };
    };
    hfcalendar.prototype.getDateList = function(){
        var envValue = this.envValue;
        var dateList = [];
        var thisPrevdaysInMonth = envValue.prevdaysInMonth;
        for(var i=0 ; i < envValue.monthFirstDay; i++){
            dateList.push({"date" : thisPrevdaysInMonth, "funlldate" :envValue.prevYYYYMM+'-'+thisPrevdaysInMonth});
            thisPrevdaysInMonth--;
        }
        dateList.reverse();
        for(var j = 42 - dateList.length, i = 1; i <= j; i++){
            if(i <= envValue.nowdaysInMonth){
                var date = i;
                var funlldate = envValue.nowYYYYMM +'-'+date;
            }else{
                var date = i - envValue.nowdaysInMonth;
                var funlldate = envValue.nextYYYYMM +'-'+date;
            }
            dateList.push({"date" : date, "funlldate": funlldate });
        }
        return dateList;
    };
    hfcalendar.prototype.getCalendarHead = function(){
        var calendarHead = "<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>";
        return calendarHead;
    };
    hfcalendar.prototype.getCalendarBody = function(){
        var dateList = this.getDateList();
        var tb='', tr='';
        for(var j = dateList.length, i = 0; i < j; i ++){
            tr += '<td><a href="javascript:void(0);"  data-date="'+ dateList[i].funlldate +'">' + dateList[i].date + '</a></td>';
            if((i+1)%7 == 0){
                tb += '<tr>' + tr + '</tr>';
                tr = '';
            }
        }
        var tbody = '<tbody>'+tb+'</tbody>';
        return tbody;
    };
    hfcalendar.prototype.getCalendar = function(){
        var thead = this.getCalendarHead();
        var tbody = this.getCalendarBody()
        var table = "<table>"+thead+tbody+"</table>";
        return table;
    };
    hfcalendar.prototype.getCalendarTitle = function(){
        var options = this.envValue;
        var title = options.now.format("YYYY年 - MMM");
        return title;
    };
    var hfcalendar = new hfcalendar($('#mincalendar'));
    window.test = hfcalendar;
});
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */

/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#87CEEB" weight=24 icon="\uf1b6"
namespace XRbit_传感器 {
//  初始化颜色传感器
    // TSC_INIT()

    export enum enVoice {
        //% blockId="Voice" block="Voice"
        Voice = 0,
        //% blockId="NoVoice" block="NoVoice"
        NoVoice = 1
    }

    export enum enIR {
        //% blockId="Get" block="Get"
        Get = 0,
        //% blockId="NoGet" block="NoGet"
        NoGet = 1
    }


    export enum enBuzzer {
        //% blockId="NoBeep" block="NoBeep"
        NoBeep = 0,
        //% blockId="Beep" block="Beep"
        Beep = 1,
    }
    export enum irPin {
        //% blockId="ir_Left" block="Left_IR_P12"
        ir_Left = 1,
        //% blockId="ir_Right" block="Right_IR_P14"
        ir_Right = 2,
        //% blockId="ir_Avoid" block="Avoid_IR_P13"
        ir_Avoid = 3
    }
    // 颜色捕捉枚举类型
    enum colors {
        R,
        G,
        B
    }
    // 颜色传感器初始化程序
    // function TSC_INIT(): void {
    //     let iic_address = 0
    //     iic_address = 0x29
    //     pins.i2cWriteNumber(
    //         iic_address,
    //         0x80 | 0x12,
    //         NumberFormat.Int8LE,
    //         false
    //     )
    //     // serial.writeValue("x", pins.i2cReadNumber(iic_address, NumberFormat.Int8LE, false))
    //     pins.i2cWriteNumber(
    //         iic_address,
    //         0x80 | 0x00,
    //         NumberFormat.Int8LE,
    //         true
    //     )
    //     pins.i2cWriteNumber(
    //         iic_address,
    //         1,
    //         NumberFormat.Int8LE,
    //         false
    //     )
    //     basic.pause(10)
    //     pins.i2cWriteNumber(
    //         iic_address,
    //         0x80 | 0x00,
    //         NumberFormat.Int8LE,
    //         true
    //     )
    //     pins.i2cWriteNumber(
    //         iic_address,
    //         3,
    //         NumberFormat.Int8LE,
    //         false
    //     )
    // }

    // // 读取RGB的数据
    // function TCS_farve(add: number, c: colors): number {
    //     let a = 0
    //     switch (c) {
    //         case 0:
    //             a = 0x80 | 0x16;
    //             break;
    //         case 1:
    //             a = 0x80 | 0x18;
    //             break;
    //         case 2:
    //             a = 0x80 | 0x1A;
    //             break;
    //         default:
    //             a = 0x80 | 0x16;
    //     }
    //     pins.i2cWriteNumber(
    //         add,
    //         a,
    //         NumberFormat.Int8LE,
    //         false
    //     )
    //     return Math.map(pins.i2cReadNumber(add, NumberFormat.Int16LE, false), 100, 5000, 0, 255)
    // }
    //% blockId=XRBIT_ColorGrapAndSetRGB block="ColorGrapAndSetRGB"
    //% weight=94
    //% blockGap=10
    //% color="#87CEEB"
    export function ColorGrapAndSetRGB(): void {
        // let b = 0;
        // let g = 0
        // let r = 0
        // let iic_address = 0x29;
        // r = TCS_farve(iic_address, colors.R)
        // g = TCS_farve(iic_address, colors.G)
        // b = TCS_farve(iic_address, colors.B)
        // // 获取到RGB值后，设置彩灯
        // XRbit_小车.RGB_Car_Program().showColor(neopixel.rgb(r, g, b))
    }

    //% blockId=XRbit_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);
    }

    //% blockId=XRbit_IR_Sensor block="IR_Sensor|pin %pin| |%value|障碍物"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Sensor(pin: irPin, value: enIR): boolean {
        let Pin:DigitalPin;
        if(pin==1)
        {
            Pin = DigitalPin.P12;
        }
        if(pin==2)
        {
            Pin = DigitalPin.P14;
        }
        if(pin==3)
        {
            Pin = DigitalPin.P13;
        }

        pins.setPull(Pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(Pin) == value) {
            return true;
        }
        else {
            return false;
        }
    }

    //% blockId=XRbit_ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {
        // send pulse
        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(Trig, PinPullMode.PullNone);
            pins.digitalWritePin(Trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(Trig, 1);
            control.waitMicros(15);
            pins.digitalWritePin(Trig, 0);

            let d = pins.pulseIn(Echo, PulseValue.High, 43200);
            list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }
}

/*****************************************************************************************************************************************
 *  小车类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% weight=5 color=#9900CC icon="\uf1b9"
namespace XRbit_小车 {
    const XRBIT_ADDRESS = 0x17
    let xrStrip: neopixel.Strip;
    export enum enMotor {
        //% blockId="leftMotor" block="leftMotor"
        leftMotor = 0x14,
        //% blockId="rightMotor" block="rightMotor"
        rightMotor = 0x15,
        //% blockId="SweepingMotor" block="SweepingMotor"
        SweepingMotor = 0x16,      

    }

    export enum enCarLight {
        //% blockId="openCarLight" block="openCarLight"
        openCarLight = 1,
        //% blockId="closeCarLight" block="closeCarLight"
        closeCarLight = 0,    
    }

    export enum enMecanum {
        //% blockId="northWest" block="northWest"
        northWest = 0x17,
        //% blockId="northEast" block="northEast"
        northEast = 0x18,
        //% blockId="east" block="east"
        east = 0x19,
        //% blockId="west" block="west"
        west = 0x20,
        //% blockId="north" block="north"
        north = 0x21,
        //% blockId="south" block="south"
        south = 0x22,
        //% blockId="southWest" block="southWest"
        southWest = 0x23,
        //% blockId="southEast" block="southEast"
        southEast = 0x24,
    }

    


    function i2cwrite(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function i2cread(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    //% blockId=XRbit_SetCarLight block="SetCarLight|pin %pin |%carLight"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function SetCarLight(pin: DigitalPin, carLight: enCarLight): void {   
            pins.digitalWritePin(pin, carLight);      
    }

    //% blockId=XRbit_SetMotor block="SetMotor|Motor %Motor|Speed %Speed"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    //% Speed.min=-100 Speed.max=100
    export function SetMotor(Motor: enMotor, Speed: number): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = Motor;
        buf2[0] = Speed+100;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }

    //% blockId=XRbit_SetMecanumWheel block="SetMecanumWheel|direction %Mecanum|Speed %Speed"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    //% Speed.min=-100 Speed.max=100
    export function SetMecanumWheel(Mecanum: enMecanum, Speed: number): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = Mecanum;
        buf2[0] = Speed+100;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_SetMecanumStop block="SetMecanumStop"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function SetMecanumStop(): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x25;
        buf2[0] = 0x00;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }

    //% blockId=XRBIT_SetServoAngle block="SetServoAngle|Num %Num|Angle %Angle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    //% Num.min=1 Num.max=8 Angle.min=0 Angle.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function SetServoAngle(Num: number, Angle: number): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = Num;
        buf2[0] = Angle;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }

    //% blockId=XRBIT_ReSetServoAngle block="ReSetServoAngle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function ReSetServoAngle(): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x00;
        buf2[0] = 0x01;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }
    //% blockId=XRBIT_SaveServoAngle block="SaveServoAngle"
    //% weight=94
    //% blockGap=10
    //% color="#0fbc11"
    export function SaveServoAngle(): void {
        let buf1 = pins.createBuffer(2);
        let buf2 = pins.createBuffer(2);
        buf1[0] = 0xFF;
        buf1[1] = 0x11;
        buf2[0] = 0x01;
        buf2[1] = 0xFF;
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf1);
        pins.i2cWriteBuffer(XRBIT_ADDRESS,buf2);
    }


    //% blockId=XRit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#0fbc11"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!xrStrip) {
            xrStrip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB);
        }
        return xrStrip;
    }
}
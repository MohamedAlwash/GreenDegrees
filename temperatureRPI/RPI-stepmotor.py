import time
import os
import serial
import requests
import RPi.GPIO as GPIO

serialDevDir='/dev/serial/by-id'
temperatureKas = 0
temperatureClient = 0

status = True

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
# Define GPIO signals to use Pins 18,22,24,26 GPIO24,GPIO25,GPIO8,GPIO7
StepPins = [24,25,8,7]
# Set all pins as output
for pin in StepPins:
        print("Setup pins")
        GPIO.setup(pin,GPIO.OUT)
        GPIO.output(pin, False)
# Define some settings
WaitTime = 0.001

StepCount2 = 8
Seq2 = []
Seq2 = range(0, StepCount2)
Seq2[0] = [1,0,0,0]
Seq2[1] = [1,1,0,0]
Seq2[2] = [0,1,0,0]
Seq2[3] = [0,1,1,0]
Seq2[4] = [0,0,1,0]
Seq2[5] = [0,0,1,1]
Seq2[6] = [0,0,0,1]
Seq2[7] = [1,0,0,1]
Seq = Seq2
StepCount = StepCount2
nbStepsPerRev=1024

def steps(nb):
        StepCounter = 0
        if nb<0: sign=-1
        else: sign=1
        nb=sign*nb*2 #times 2 because half-step
        print("nbsteps {} and sign {}".format(nb,sign))
        for i in range(nb):
                for pin in range(4):
                        xpin = StepPins[pin]
                        if Seq[StepCounter][pin]!=0:
                                GPIO.output(xpin, True)
                        else:
                                GPIO.output(xpin, False)
                StepCounter += sign
        # If we reach the end of the sequence
        # start again
                if (StepCounter==StepCount):
                        StepCounter = 0
                if (StepCounter<0):
                        StepCounter = StepCount-1
                # Wait before moving on
                time.sleep(WaitTime)

if ( os.path.isdir(serialDevDir) ):
    serialDevices = os.listdir(serialDevDir)

    if ( len(serialDevices) > 0 ):

        serialDevicePath = os.path.join(serialDevDir, serialDevices[0])

        ser = serial.Serial(
            port=serialDevicePath,
            baudrate=115200,
            timeout= None
)
        while True:
            microBitData = ser.readline()
            firstCharacter = microBitData[0]
            if( firstCharacter == "A" ) :
                temperatureKas = int(microBitData[3:5])

                response = requests.post("https://greendegrees.azurewebsites.net/api/greenhouse", json={"measuredTemperature" : temperatureKas})

                print("This is A, temperature from MicroBit:", temperatureKas)
                print(response)
                
            if( firstCharacter == "B" ) :
                temperatureClient = requests.get("https://greendegrees.azurewebsites.net/api/greenhouse/tempature")
                temperatureForMicroBit = str(temperatureClient.json())
                temperatureClient = int(temperatureClient.json())
                print("this is B, temperature from Client:", temperatureClient)

                ser.write(temperatureForMicroBit)
                time.sleep(5)
                if( temperatureClient > temperatureKas ) :
                    if (not status) :
                        status=True
                        hasRun=False
                        while not hasRun:
                                steps(-nbStepsPerRev)
                                time.sleep(1)
                                hasRun=True

                        print("Stop motor")
                        for pin in StepPins:
                                GPIO.output(pin, False)
                        print("dicht")
                else:
                    if(status) :
                        status=False
                        hasRun=False
                        while not hasRun:
                                steps(nbStepsPerRev)
                                time.sleep(1)
                                hasRun=True

                        print("Stop motor")
                        for pin in StepPins:
                                GPIO.output(pin, False)
                    print("open")

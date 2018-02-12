package com.wondersgroup.frame.core.base.util;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class PY {

	public static String toPinYin(String text) { 

		// 设置汉字拼音输出的格式
		HanyuPinyinOutputFormat fmt = new HanyuPinyinOutputFormat();

		// 不使用音调标记，
		fmt.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

		// 如果使用WITH_TONE_MARK，则必须指定setVCharType为WITH_U_UNICODE，否则报错
		// fmt.setToneType(HanyuPinyinToneType.WITH_TONE_MARK);
		// fmt.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);

		// 韵母“驴”(lu->lv)使用V来代替
		fmt.setVCharType(HanyuPinyinVCharType.WITH_V);
		// 返回的拼音为小字字母
		fmt.setCaseType(HanyuPinyinCaseType.LOWERCASE);

		StringBuilder allPinYin = new StringBuilder();
		for (int i = 0; i < text.length(); i++) {
			char wordChar = text.charAt(i);
			String word = Character.toString(wordChar);

			// 如果为汉字
			if (word.matches("[\\一-\\龥]")) {
				try {
					// 返回汉字的全部拼音(因为有些汉字为多音字，否则只返回一个)
					String[] pinYinArray = PinyinHelper
							.toHanyuPinyinStringArray(wordChar, fmt);
					// 取第一个拼音
					String pinYin = pinYinArray[0];
					if (pinYin != null) {
						allPinYin.append(pinYin);
					}
				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
				} catch (NullPointerException e) {
					// 如果是日文，可能抛出该异常
					e.printStackTrace();
				}
			}
		}
		return allPinYin.toString();
	}
	
	//首字母
	public static String toPinYinFrist(String text) {

		// 设置汉字拼音输出的格式
		HanyuPinyinOutputFormat fmt = new HanyuPinyinOutputFormat();

		// 不使用音调标记，
		fmt.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

		// 如果使用WITH_TONE_MARK，则必须指定setVCharType为WITH_U_UNICODE，否则报错
		// fmt.setToneType(HanyuPinyinToneType.WITH_TONE_MARK);
		// fmt.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);

		// 韵母“驴”(lu->lv)使用V来代替
		fmt.setVCharType(HanyuPinyinVCharType.WITH_V);
		// 返回的拼音为小字字母
		fmt.setCaseType(HanyuPinyinCaseType.LOWERCASE);

		StringBuilder allPinYin = new StringBuilder();
		for (int i = 0; i < text.length(); i++) {
			char wordChar = text.charAt(i);
			String word = Character.toString(wordChar);

			// 如果为汉字
			if (word.matches("[\\一-\\龥]")) {
				try {
					// 返回汉字的全部拼音(因为有些汉字为多音字，否则只返回一个)
					String[] pinYinArray = PinyinHelper.toHanyuPinyinStringArray(wordChar, fmt);
					// 取第一个拼音
					String pinYin = String.valueOf(pinYinArray[0].charAt(0));
					if (pinYin != null) {
						allPinYin.append(pinYin);
					}
				} catch (BadHanyuPinyinOutputFormatCombination e) {
					e.printStackTrace();
				} catch (NullPointerException e) {
					// 如果是日文，可能抛出该异常
					e.printStackTrace();
				}
			}else if (word.matches("[A-Za-z]")){
				allPinYin.append(wordChar);
			}else if (word.matches("[0-9]")){
				allPinYin.append(wordChar);
			}else if (word.equalsIgnoreCase("_")){
				allPinYin.append(wordChar);
			}
			else{
				//System.out.println("去除了：" + wordChar);
			}
		}
		return allPinYin.toString();
	}
}
